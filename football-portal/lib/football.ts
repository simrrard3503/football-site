const BASE_URL = "https://api.football-data.org/v4";

async function footballFetch(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_DATA_API_KEY || "",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API 요청 실패: ${res.status} / ${text}`);
  }

  return res.json();
}

export async function getCompetitions() {
  return footballFetch("/competitions");
}

export async function getPremierLeagueMatches() {
  return footballFetch("/competitions/PL/matches");
}