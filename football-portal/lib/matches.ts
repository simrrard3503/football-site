import premierLeagueMatches from "../data/premier-league-matches.json";
import laLigaMatches from "../data/la-liga-matches.json";
import serieAMatches from "../data/serie-a-matches.json";
import bundesligaMatches from "../data/bundesliga-matches.json";
import ligue1Matches from "../data/ligue-1-matches.json";

export const leagueDataMap: Record<string, { title: string; matches: any[] }> = {
  "premier-league": {
    title: "Premier League",
    matches: premierLeagueMatches,
  },
  "la-liga": {
    title: "La Liga",
    matches: laLigaMatches,
  },
  "serie-a": {
    title: "Serie A",
    matches: serieAMatches,
  },
  bundesliga: {
    title: "Bundesliga",
    matches: bundesligaMatches,
  },
  "ligue-1": {
    title: "Ligue 1",
    matches: ligue1Matches,
  },
};

export const statusOptions = ["ALL", "LIVE", "SCHEDULED", "FINISHED"];

export function getStatusColor(status: string) {
  if (status === "LIVE") return "#dc2626";
  if (status === "SCHEDULED") return "#2563eb";
  if (status === "FINISHED") return "#16a34a";
  return "#6b7280";
}