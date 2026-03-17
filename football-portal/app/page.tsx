import Link from "next/link";
import { leagues } from "../lib/leagues";

export default function HomePage() {
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
        <h1
          style={{
            marginBottom: "8px",
            fontSize: "36px",
            fontWeight: 800,
            color: "#111827",
          }}
        >
          European Football Data Portal
        </h1>

        <p
          style={{
            marginBottom: "32px",
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          유럽 5대리그 경기 데이터를 리그별로 쉽게 보는 축구 데이터 포털
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {leagues.map((league) => (
            <Link
              key={league.slug}
              href={`/league/${league.slug}`}
              style={{
                display: "block",
                padding: "20px",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                textDecoration: "none",
                color: "#111827",
                fontWeight: 700,
                background: "#ffffff",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>
                {league.emoji}
              </div>
              <div style={{ fontSize: "18px" }}>{league.name}</div>
              <div style={{ marginTop: "6px", color: "#6b7280", fontSize: "14px" }}>
                경기 일정과 결과 보기
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}