import ActionButton from "@/shared/components/Button/ActionButton";
import BackOfficeShell from "@/shared/components/BackOfficeShell";
import { actionTextButtonStyle, statusBadgeStyle } from "@/shared/components/BackOfficeShell/style";
import { allCodiItems } from "@/shared/constants/back-office-data";

const AllCodiPage = () => {
  return (
    <BackOfficeShell activeMenu="all-codi" title="모든 코디">
      <section className="rounded-sm border border-gray bg-white">
        <header className="border-b border-gray px-4 py-3">
          <p className="text-sm font-semibold">코디 목록 관리</p>
          <p className="mt-1 text-xs text-gray">업로드 사용자와 사용된 코디 정보를 확인하고 상태를 변경할 수 있습니다.</p>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray bg-white">
                <th className="px-4 py-3 text-left font-medium">코디 이름</th>
                <th className="px-4 py-3 text-left font-medium">업로드 사용자</th>
                <th className="px-4 py-3 text-left font-medium">사용된 코디 정보 리스트</th>
                <th className="px-4 py-3 text-left font-medium">상태</th>
                <th className="px-4 py-3 text-left font-medium">설정</th>
              </tr>
            </thead>
            <tbody>
              {allCodiItems.map((item) => (
                <tr key={item.id} className="border-b border-gray/60">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.uploadedBy}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-gray">{item.usedCodiInfoList.join(", ")}</span>
                      <button type="button" className={actionTextButtonStyle()}>
                        상세보기
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={statusBadgeStyle({ status: item.status })}>
                      {item.status === "active" ? "운영 중" : "중단"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {item.status === "active" ? (
                        <ActionButton label="중단" color="secondary" size="sm" />
                      ) : (
                        <ActionButton label="재개" color="primary" size="sm" />
                      )}
                      <ActionButton label="삭제" color="cancel" size="sm" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </BackOfficeShell>
  );
};

export default AllCodiPage;
