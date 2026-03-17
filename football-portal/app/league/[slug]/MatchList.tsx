"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getStatusColor } from "../../../lib/matches";

type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  status: string;
  utcDate: string;
  score: {
    home: number | null;
    away: number | null;
  };
};

type Props = {
  slug: string;
  matches: Match[];
};

type SortOption = "latest" | "oldest" | "homeTeam" | "awayTeam";

export default function MatchList({ slug, matches }: Props) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const filteredMatches = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    const searchedMatches = !keyword
      ? matches
      : matches.filter((match) => {
          const home = match.homeTeam.toLowerCase();
          const away = match.awayTeam.toLowerCase();

          return home.includes(keyword) || away.includes(keyword);
        });

    const sortedMatches = [...searchedMatches];

    if (sortBy === "latest") {
      sortedMatches.sort(
        (a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime()
      );
    }

    if (sortBy === "oldest") {
      sortedMatches.sort(
        (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
      );
    }

    if (sortBy === "homeTeam") {
      sortedMatches.sort((a, b) => a.homeTeam.localeCompare(b.homeTeam));
    }

    if (sortBy === "awayTeam") {
      sortedMatches.sort((a, b) => a.awayTeam.localeCompare(b.awayTeam));
    }

    return sortedMatches;
  }, [matches, search, sortBy]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="팀명을 검색해보세요. 예: Liverpool, Arsenal"
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            outline: "none",
            backgroundColor: "#ffffff",
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          style={{
            width: "100%",
            padding: "14px 16px",
            borderRadius: "12px",
            border: "1px solid #d1d5db",
            fontSize: "15px",
            outline: "none",
            backgroundColor: "#ffffff",
            cursor: "pointer",
          }}
        >
          <option value="latest">최신 경기순</option>
          <option value="oldest">오래된 경기순</option>
          <option value="homeTeam">홈팀 이름순</option>
          <option value="awayTeam">원정팀 이름순</option>
        </select>
      </div>

      <div
        style={{
          marginBottom: "18px",
          color: "#4b5563",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        검색 결과 {filteredMatches.length}경기
      </div>

      <div style={{ display: "grid", gap: "16px" }}>
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <Link
              key={match.id}
              href={`/league/${slug}/match/${match.id}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "18px",
                  padding: "20px",
                  background: "#ffffff",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {new Date(match.utcDate).toLocaleString("ko-KR")}
                  </div>

                  <div
                    style={{
                      padding: "6px 10px",
                      borderRadius: "999px",
                      backgroundColor: "#f3f4f6",
                      color: getStatusColor(match.status),
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    {match.status}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    {match.homeTeam}
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 800,
                      color: "#111827",
                      minWidth: "72px",
                      textAlign: "center",
                    }}
                  >
                    {match.score.home ?? "-"} : {match.score.away ?? "-"}
                  </div>

                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#111827",
                      textAlign: "right",
                    }}
                  >
                    {match.awayTeam}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: "14px",
                    color: "#6b7280",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  경기 상세 보기 →
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div
            style={{
              padding: "24px",
              borderRadius: "16px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              color: "#6b7280",
              fontWeight: 600,
              lineHeight: 1.6,
            }}
          >
            조건에 맞는 경기가 없습니다.
            <br />
            다른 팀명이나 정렬 조건을 시도해보세요.
          </div>
        )}
      </div>
    </div>
  );
}