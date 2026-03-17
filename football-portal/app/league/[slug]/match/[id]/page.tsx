import Link from "next/link";
import { leagueDataMap, getStatusColor } from "../../../../../lib/matches";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const league = leagueDataMap[slug];

  if (!league) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1>리그를 찾을 수 없습니다</h1>
        <Link href="/">홈으로 돌아가기</Link>
      </main>
    );
  }

  const match = league.matches.find((item) => String(item.id) === id);

  if (!match) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1>경기를 찾을 수 없습니다</h1>
        <Link href={`/league/${slug}`}>리그 페이지로 돌아가기</Link>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f8fc",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <Link
            href={`/league/${slug}`}
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            ← {league.title} 경기 목록으로
          </Link>
        </div>

        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "20px",
            padding: "28px",
            background: "#ffffff",
            boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              marginBottom: "14px",
              color: "#6b7280",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {league.title}
          </div>

          <h1
            style={{
              fontSize: "34px",
              fontWeight: 800,
              color: "#111827",
              marginBottom: "18px",
              lineHeight: 1.3,
            }}
          >
            {match.homeTeam} vs {match.awayTeam}
          </h1>

          <div
            style={{
              display: "inline-block",
              padding: "8px 12px",
              borderRadius: "999px",
              backgroundColor: "#f3f4f6",
              color: getStatusColor(match.status),
              fontWeight: 700,
              fontSize: "14px",
              marginBottom: "20px",
            }}
          >
            {match.status}
          </div>

          <div
            style={{
              display: "grid",
              gap: "14px",
              fontSize: "17px",
              color: "#374151",
            }}
          >
            <div>
              <strong>경기 날짜:</strong>{" "}
              {new Date(match.utcDate).toLocaleString("ko-KR")}
            </div>

            <div>
              <strong>홈팀:</strong> {match.homeTeam}
            </div>

            <div>
              <strong>원정팀:</strong> {match.awayTeam}
            </div>

            <div>
              <strong>스코어:</strong> {match.score.home ?? "-"} :{" "}
              {match.score.away ?? "-"}
            </div>

            <div>
              <strong>경기 상태:</strong> {match.status}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}