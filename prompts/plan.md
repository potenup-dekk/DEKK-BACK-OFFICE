## Plan: 관리자 카드 검수 흐름

관리자 카드 목록과 검수 화면을 기존 카테고리 관리 구조와 Swagger 관리자 카드 API를 기준으로 추가한다. 목록은 서버 페이지에서 조회하고 클라이언트 위젯에서 필터와 그리드를 처리하며, 검수 화면은 cardId 필터를 이용해 같은 목록 API로 단건 조회를 재사용한다. 카테고리 지정, 승인, 반려는 모두 서버 액션으로 분리하되, Swagger 스키마상 검수 화면에 필요한 이미지/상품/현재 카테고리 정보가 보장되지 않으므로 실제 응답 검증을 1차 게이트로 둔다.

**Steps**

1. Phase 1. 계약 게이트 정리
   - OpenAPI 기준으로 관리자 카드 목록 조회 파라미터와 성공/실패 코드를 정리한다: page, size, sort, status, cardId, originId, startDate, endDate, 성공 코드 SC 계열, 에러 코드 EC 계열.
   - 관리자 카드 검수 화면에서 필요한 필드와 Swagger AdminCardResponse 필드를 대조한다.
   - 구현 시작 시 실제 응답에 cardImageUrl, products, 현재 연결 categoryIds 또는 categories가 있는지 검증한다. 이 필드가 없으면 카테고리 즉시 저장과 상세 레이아웃 일부는 백엔드 계약 보완 없이는 안전하게 구현할 수 없으므로 범위를 목록 + approve/reject 중심으로 축소하거나 추가 계약을 받아야 한다.
2. Phase 2. API 계층 추가. depends on 1
   - src/shared/api/services/cards 아래에 관리자 카드 목록 조회용 GET 서비스와 카드 응답/쿼리/페이지 타입을 추가한다.
   - 상세 검수 화면은 별도 상세 API를 가정하지 않고, cardId 필터를 넘긴 관리자 목록 조회 GET을 재사용해 단건 로드한다.
   - src/shared/api/services/cards 아래에 approve, reject, assign-categories 서비스와 응답 코드 판별 함수를 추가한다.
   - src/shared/api/actions/cards 아래에 approve, reject, assign-categories 서버 액션과 결과 타입을 추가한다.
   - 액션 성공 시 /cards 와 /cards/[cardId] 재검증 전략을 정한다.
3. Phase 3. 목록 페이지 구성. depends on 2
   - src/app/(web)/cards/page.tsx 서버 페이지를 추가해 초기 필터를 해석하고 관리자 카드 목록을 조회한다.
   - 목록 전용 클라이언트 위젯을 추가해 핵심 필터만 노출한다: status, cardId, originId, startDate, endDate. 기본 상태는 pending 중심으로 세팅한다.
   - 카드 그리드는 w-75, aspect-[1/1.5], cursor-pointer 규격으로 맞추고 카드 클릭 시 /cards/[cardId]로 이동한다.
   - 카드 셀에는 검수 효율에 필요한 최소 메타데이터를 우선 배치한다: 상태, originId, 플랫폼, 타겟 성별, 생성일 등. 실제 응답에 이미지가 있으면 썸네일도 포함한다.
   - 쿼리스트링과 필터 UI를 동기화해 새로고침과 뒤로 가기 시 상태가 유지되게 한다.
4. Phase 4. 검수 페이지 구성. depends on 2 and 3
   - src/app/(web)/cards/[cardId]/page.tsx 서버 페이지를 추가해 cardId 단건 데이터와 전체 카테고리 트리를 함께 로드한다.
   - 데스크톱 기준 한 화면 의사결정 레이아웃으로 구성한다: 중앙 정렬, gap-5, 좌우 2카드, 스크롤 없는 섹션 우선.
   - 좌측 카드는 메인 서비스의 카드 비주얼을 최대한 따르되 애니메이션은 제외한다. 실제 응답에 이미지 URL이 있으면 꽉 차는 사진 카드로 렌더링한다.
   - 우측 카드는 상품 목록, 태그, 상태 정보, 카테고리 편집 영역, 승인/반려 액션 영역을 둔다. 상품 목록 또는 현재 카테고리 데이터가 없으면 해당 영역은 계약 미충족 상태로 가드 처리한다.
5. Phase 5. 카테고리 편집과 액션 정책. depends on 4
   - 전체 카테고리 옵션은 /adm/v1/categories GET 결과를 재사용한다.
   - 사용자가 요청한 대로 카테고리 변경은 즉시 저장 정책으로 간다. 다만 assign-categories API가 교체형 PUT 이므로 현재 연결 categoryIds를 알고 있을 때만 안전하게 즉시 저장을 허용한다.
   - 현재 연결 categoryIds를 알 수 없는 경우에는 편집 UI를 비활성화하거나 읽기 전용으로 두고, 승인/반려만 허용하는 안전 장치를 둔다.
   - 승인과 반려는 각각 PATCH 액션으로 분리하고, 성공 후에는 현재 필터를 유지한 목록으로 돌아가 다음 검수로 이어지게 한다.
6. Phase 6. 검증. depends on 3, 4, 5
   - 타입 검사와 린트로 서비스/액션/페이지 경계를 검증한다.
   - 수동 검증: pending 기본 필터 진입, 카드 클릭 이동, 상세 단건 조회 실패 처리, 카테고리 즉시 저장 성공/실패, approve/reject 성공 후 목록 복귀, 쿼리 유지 여부.
   - 레이아웃 검증: 데스크톱 해상도에서 한 화면에 두 카드와 액션이 스크롤 없이 들어오는지 확인한다.
   - 계약 검증: 실제 관리자 카드 응답이 검수 화면 요구 필드를 제공하는지 확인하고, 부족 시 범위 조정 또는 백엔드 협의 포인트를 기록한다.

**Relevant files**

- /Users/bagjong-won/Desktop/Project/DEKK-BACK-OFFICE/src/app/(web)/categories/page.tsx — 서버 페이지에서 GET 데이터를 로드하고 클라이언트 위젯에 주입하는 패턴 재사용
- /Users/bagjong-won/Desktop/Project/DEKK-BACK-OFFICE/src/widgets/category-selector/ui/category-selector.tsx — 클라이언트 위젯의 상태, 액션 호출, 에러 처리 패턴 재사용
- /Users/bagjong-won/Desktop/Project/DEKK-BACK-OFFICE/src/widgets/category-selector/style.ts — style.ts 와 tailwind-variants 슬롯 분리 패턴 재사용
- /Users/bagjong-won/Desktop/Project/DEKK-BACK-OFFICE/src/shared/api/fetcher/request-api.ts — 관리자 카드 GET 서비스의 쿠키 전달과 응답 검증 재사용
- /Users/bagjong-won/Desktop/Project/DEKK-BACK-OFFICE/src/shared/api/services/categories/get-category-tree.service.ts — response.code 기반 성공 판별 패턴 재사용
- /Users/bagjong-won/Desktop/Project/DEKK-BACK-OFFICE/src/shared/api/actions/categories/create-category.action.ts — 서버 액션 결과 타입과 revalidatePath 패턴 재사용
- /Users/bagjong-won/Desktop/Project/DEKK-BACK-OFFICE/src/widgets/sidebar/model/nav-items.const.ts — /cards 네비게이션 진입점과 레이블 유지
- /Users/bagjong-won/Desktop/Project/DEKK-BACK-OFFICE/src/shared/ui/button.tsx — 승인/반려 버튼 variant 확장 또는 재사용 기준

**Verification**

1. OpenAPI 계약과 실제 응답을 대조해 관리자 카드 단건 검수에 필요한 필드가 존재하는지 먼저 확인한다.
2. 목록 페이지에서 핵심 필터 조합별로 요청 파라미터가 정확히 매핑되는지 확인한다.
3. /cards/[cardId] 진입 시 cardId 필터 기반 단건 조회가 안정적으로 동작하는지 확인한다.
4. 카테고리 즉시 저장이 허용되는 전제 조건이 충족되지 않으면 UI가 안전하게 차단되는지 확인한다.
5. approve/reject 성공 후 목록 복귀와 필터 유지가 동작하는지 확인한다.
6. 데스크톱 레이아웃이 스크롤 없이 의사결정 가능한지 수동 확인한다.

**Decisions**

- 상세 라우트는 /cards/[cardId] 를 사용한다.
- 목록 필터는 핵심만 우선 노출한다: status, cardId, originId, startDate, endDate.
- 검수 데이터 소스는 우선 관리자 카드 목록 조회의 content 를 재사용한다.
- 카테고리 저장 시점은 즉시 저장으로 계획하되, 현재 연결 카테고리 식별이 가능할 때만 활성화한다.
- 모바일 최적화는 이번 범위에 포함하지 않으며, 레이아웃이 깨지지 않는 수준만 보장한다.

**Further Considerations**

1. AdminCardResponse 에 이미지, 상품, 현재 카테고리 정보가 실제로 없다면 검수 페이지의 좌우 카드 요구사항은 완전 구현이 불가능하다. 이 경우 백엔드 계약 추가가 최우선이다.
2. approve/reject 후 상세에 머무르기보다 목록으로 복귀시키는 것이 관리자 처리량에 유리하므로 기본 동작으로 권장한다.
3. 현재 카테고리 정보 없이 /adm/v1/categories 결과만으로 즉시 저장을 수행하면 기존 매핑을 덮어쓸 수 있으므로 안전 장치가 필요하다.
