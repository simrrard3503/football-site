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

type SortOption = "latest" | "oldest" | "homeTeam";

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

    return sortedMatches;
  }, [matches, search, sortBy]);

  return (
    <div>
      <div
        style={{
          display: "grid",
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
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    {match.homeTeam} vs {match.awayTeam}
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
                    color: "#6b7280",
                    marginBottom: "8px",
                    fontSize: "15px",
                  }}
                >
                  날짜: {new Date(match.utcDate).toLocaleString("ko-KR")}
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  스코어: {match.score.home ?? "-"} : {match.score.away ?? "-"}
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
            }}
          >
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}