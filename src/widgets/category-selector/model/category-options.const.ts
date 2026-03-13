import type { CategoryGroup } from "@/widgets/category-selector/model/category.type";

const categoryGroups: CategoryGroup[] = [
  {
    primary: "상의",
    secondary: ["셔츠", "맨투맨", "후드", "니트", "자켓"],
  },
  {
    primary: "하의",
    secondary: ["데님", "슬랙스", "조거", "숏팬츠", "스커트"],
  },
  {
    primary: "아우터",
    secondary: ["코트", "패딩", "가디건", "바람막이", "블레이저"],
  },
  {
    primary: "신발",
    secondary: ["스니커즈", "러닝화", "부츠", "샌들", "로퍼"],
  },
  {
    primary: "액세서리",
    secondary: ["모자", "가방", "목걸이", "팔찌", "벨트"],
  },
];

export default categoryGroups;
