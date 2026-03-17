import Link from "next/link";
import { leagueDataMap, statusOptions, getStatusColor } from "../../../lib/matches";
import MatchList from "./MatchList";

export default async function LeaguePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { slug } = await params;
  const { status } = await searchParams;

  const league = leagueDataMap[slug];

  if (!league) {
    return (
      <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
        <h1>리그를 찾을 수 없습니다</h1>
        <Link href="/">홈으로 돌아가기</Link>
      </main>
    );
  }

  const selectedStatus = statusOptions.includes(status || "")
    ? status || "ALL"
    : "ALL";

  const filteredMatches =
    selectedStatus === "ALL"
      ? league.matches
      : league.matches.filter((match) => match.status === selectedStatus);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f7f8fc",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/"
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            ← 홈으로
          </Link>
        </div>

        <h1
          style={{
            marginBottom: "8px",
            fontSize: "34px",
            fontWeight: 800,
            color: "#111827",
          }}
        >
          {league.title}
        </h1>

        <p
          style={{
            marginBottom: "20px",
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          리그별 경기 일정과 결과
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          {statusOptions.map((option) => {
            const isActive = selectedStatus === option;
            const href =
              option === "ALL"
                ? `/league/${slug}`
                : `/league/${slug}?status=${option}`;

            return (
              <Link
                key={option}
                href={href}
                style={{
                  padding: "10px 14px",
                  borderRadius: "999px",
                  textDecoration: "none",
                  border: isActive ? "1px solid #111827" : "1px solid #d1d5db",
                  backgroundColor: isActive ? "#111827" : "#ffffff",
                  color: isActive ? "#ffffff" : "#374151",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                {option}
              </Link>
            );
          })}
        </div>

        
<MatchList slug={slug} matches={filteredMatches} />
        
      </div>
    </main>
  );
}