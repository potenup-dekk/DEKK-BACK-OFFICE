export interface DailyVisitorsPoint {
  date: string;
  visitors: number;
}

export interface DailyAddedCodiPoint {
  date: string;
  addedCount: number;
}

export interface CodiItem {
  id: number;
  name: string;
  uploadedBy: string;
  usedCodiInfoList: string[];
  status: "active" | "paused";
}

export const dailyVisitors: DailyVisitorsPoint[] = [
  { date: "02/24", visitors: 1240 },
  { date: "02/25", visitors: 1390 },
  { date: "02/26", visitors: 1310 },
  { date: "02/27", visitors: 1500 },
  { date: "02/28", visitors: 1720 },
  { date: "03/01", visitors: 1680 },
  { date: "03/02", visitors: 1810 },
];

export const dailyAddedCodi: DailyAddedCodiPoint[] = [
  { date: "02/24", addedCount: 7 },
  { date: "02/25", addedCount: 11 },
  { date: "02/26", addedCount: 9 },
  { date: "02/27", addedCount: 13 },
  { date: "02/28", addedCount: 16 },
  { date: "03/01", addedCount: 12 },
  { date: "03/02", addedCount: 15 },
];

export const todayAddedCodi = dailyAddedCodi[dailyAddedCodi.length - 1]?.addedCount ?? 0;
export const totalReviewedCodi = 1284;

export const allCodiItems: CodiItem[] = [
  {
    id: 1,
    name: "스프링 오피스 캐주얼",
    uploadedBy: "jinseok.park",
    usedCodiInfoList: ["자켓", "셔츠", "슬랙스"],
    status: "active",
  },
  {
    id: 2,
    name: "미니멀 데일리 룩",
    uploadedBy: "soyeon.kim",
    usedCodiInfoList: ["니트", "데님"],
    status: "paused",
  },
  {
    id: 3,
    name: "주말 나들이 코디",
    uploadedBy: "hyunwoo.lee",
    usedCodiInfoList: ["후드", "조거팬츠", "스니커즈"],
    status: "active",
  },
  {
    id: 4,
    name: "포멀 블랙 셋업",
    uploadedBy: "hanna.choi",
    usedCodiInfoList: ["블레이저", "셔츠", "구두"],
    status: "paused",
  },
];