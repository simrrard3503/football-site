export const leagues = [
  { name: "Premier League", slug: "premier-league", emoji: "🏴" },
  { name: "La Liga", slug: "la-liga", emoji: "🇪🇸" },
  { name: "Serie A", slug: "serie-a", emoji: "🇮🇹" },
  { name: "Bundesliga", slug: "bundesliga", emoji: "🇩🇪" },
  { name: "Ligue 1", slug: "ligue-1", emoji: "🇫🇷" },
];

export function getLeagueTitle(slug: string) {
  return leagues.find((league) => league.slug === slug)?.name ?? "";
}