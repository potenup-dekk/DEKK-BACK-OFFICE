import type { CategoryGroup } from "@/widgets/category-selector/model/category.type";

const categoryGroups: CategoryGroup[] = [
  {
    categoryId: 1,
    name: "상의",
    children: [
      { categoryId: 101, name: "셔츠" },
      { categoryId: 102, name: "맨투맨" },
      { categoryId: 103, name: "후드" },
      { categoryId: 104, name: "니트" },
      { categoryId: 105, name: "자켓" },
    ],
  },
  {
    categoryId: 2,
    name: "하의",
    children: [
      { categoryId: 201, name: "데님" },
      { categoryId: 202, name: "슬랙스" },
      { categoryId: 203, name: "조거" },
      { categoryId: 204, name: "숏팬츠" },
      { categoryId: 205, name: "스커트" },
    ],
  },
  {
    categoryId: 3,
    name: "아우터",
    children: [
      { categoryId: 301, name: "코트" },
      { categoryId: 302, name: "패딩" },
      { categoryId: 303, name: "가디건" },
      { categoryId: 304, name: "바람막이" },
      { categoryId: 305, name: "블레이저" },
    ],
  },
  {
    categoryId: 4,
    name: "신발",
    children: [
      { categoryId: 401, name: "스니커즈" },
      { categoryId: 402, name: "러닝화" },
      { categoryId: 403, name: "부츠" },
      { categoryId: 404, name: "샌들" },
      { categoryId: 405, name: "로퍼" },
    ],
  },
  {
    categoryId: 5,
    name: "액세서리",
    children: [
      { categoryId: 501, name: "모자" },
      { categoryId: 502, name: "가방" },
      { categoryId: 503, name: "목걸이" },
      { categoryId: 504, name: "팔찌" },
      { categoryId: 505, name: "벨트" },
    ],
  },
];

export default categoryGroups;
