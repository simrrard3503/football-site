import Link from "next/link";
import { leagueDataMap, getStatusColor } from "../../../../../lib/matches";

type PageProps = {
  params: Promise<{
    slug: string;
    id: string;
  }>;
};

export default async function MatchDetailPage({ params }: PageProps) {
  const { slug, id } = await params;

  const league = leagueDataMap[slug];

  if (!league) {
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
          <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "12px" }}>
            리그를 찾을 수 없습니다
          </h1>
          <Link href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
            홈으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  const matchId = Number(id);
  const match = league.matches.find((item) => item.id === matchId);

  if (!match) {
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
              href={`/league/${slug}`}
              style={{
                color: "#4b5563",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              ← 리그 페이지로
            </Link>
          </div>

          <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "12px" }}>
            경기를 찾을 수 없습니다
          </h1>

          <p style={{ color: "#6b7280", fontSize: "16px" }}>
            요청한 경기 정보가 존재하지 않습니다.
          </p>
        </div>
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
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
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

          <Link
            href={`/league/${slug}`}
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            ← {league.title}
          </Link>
        </div>

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#6b7280",
                  marginBottom: "8px",
                }}
              >
                {league.title}
              </div>

              <h1
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#111827",
                  margin: 0,
                }}
              >
                경기 상세 정보
              </h1>
            </div>

            <div
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                backgroundColor: "#f3f4f6",
                color: getStatusColor(match.status),
                fontWeight: 700,
                fontSize: "14px",
              }}
            >
              {match.status}
            </div>
          </div>

          <div
            style={{
              marginBottom: "28px",
              color: "#6b7280",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            경기 날짜: {new Date(match.utcDate).toLocaleString("ko-KR")}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: "20px",
              padding: "28px 20px",
              borderRadius: "20px",
              backgroundColor: "#f9fafb",
              marginBottom: "28px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                홈팀
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                {match.homeTeam}
              </div>
            </div>

            <div
              style={{
                fontSize: "40px",
                fontWeight: 900,
                color: "#111827",
                textAlign: "center",
                minWidth: "120px",
              }}
            >
              {match.score.home ?? "-"} : {match.score.away ?? "-"}
            </div>

            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  fontWeight: 700,
                  marginBottom: "10px",
                }}
              >
                원정팀
              </div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                {match.awayTeam}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                경기 ID
              </div>
              <div
                style={{
                  fontSize: "20px",
                  color: "#111827",
                  fontWeight: 800,
                }}
              >
                {match.id}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                경기 상태
              </div>
              <div
                style={{
                  fontSize: "20px",
                  color: getStatusColor(match.status),
                  fontWeight: 800,
                }}
              >
                {match.status}
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "18px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                리그
              </div>
              <div
                style={{
                  fontSize: "20px",
                  color: "#111827",
                  fontWeight: 800,
                }}
              >
                {league.title}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}