import ActionButton from "@/shared/components/Button/ActionButton";
import BackOfficeShell from "@/shared/components/BackOfficeShell";
import DailyAddedCodiBarChart from "@/shared/components/Charts/DailyAddedCodiBarChart";
import DailyVisitorsLineChart from "@/shared/components/Charts/DailyVisitorsLineChart";
import {
  dailyAddedCodi,
  dailyVisitors,
  todayAddedCodi,
  totalReviewedCodi,
} from "@/shared/constants/back-office-data";

export default function Home() {
  return (
    <BackOfficeShell activeMenu="codi-review" title="코디 검수 대시보드">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="rounded-sm border border-gray bg-white p-4 lg:col-span-2">
          <p className="text-sm font-medium">일일 방문자</p>
          <p className="mb-3 text-xs text-gray">최근 7일 추이</p>
          <DailyVisitorsLineChart data={dailyVisitors} />
        </article>

        <article className="rounded-sm border border-primary bg-white p-4">
          <p className="text-sm font-medium">총 검수된 코디</p>
          <p className="mt-3 text-3xl font-bold">{totalReviewedCodi.toLocaleString()}건</p>
          <p className="mt-2 text-xs text-gray">누적 검수 완료 기준</p>
          <div className="mt-4">
            <ActionButton label="코디 검수 바로가기" color="primary" size="sm" />
          </div>
        </article>
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <article className="rounded-sm border border-gray bg-white p-4 lg:col-span-2">
          <p className="text-sm font-medium">오늘 추가된 코디</p>
          <p className="mb-3 text-xs text-gray">일일 코디 추가 수(막대 그래프)</p>
          <DailyAddedCodiBarChart data={dailyAddedCodi} />
        </article>

        <article className="rounded-sm border border-gray bg-white p-4">
          <p className="text-sm font-medium">오늘 추가된 코디 수</p>
          <p className="mt-3 text-3xl font-bold">{todayAddedCodi}건</p>
          <p className="mt-2 text-xs text-gray">자정 기준 누적</p>
        </article>
      </section>
    </BackOfficeShell>
  );
}
