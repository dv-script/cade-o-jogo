import { getMatches } from "@/data/get-matches";
import { getTeamById } from "@/data/get-team-by-id";
import { IFetchMatchesResponse } from "@/types/IFetchMatchesResponse";
import { IFetchTeamResponse } from "@/types/IFetchTeamResponse";
import { IMatch } from "@/types/IMatch";
import { ITeam } from "@/types/ITeam";
import { MatchesByRound } from "@/components/matches-by-round";

export default async function Page() {
  const allMatches = (await getMatches()) as IFetchMatchesResponse;
  const maxRound = allMatches.data.slice(-1)[0].round;

  const teamIds = new Set(
    allMatches.data.flatMap((match: IMatch) => [
      match.idTeamHome,
      match.idTeamAway,
    ])
  );

  const teamsDetails: IFetchTeamResponse[] = await Promise.all(
    Array.from(teamIds).map(getTeamById)
  );

  const teamDetailsMap: Record<string, ITeam> = teamsDetails.reduce(
    (acc, teamResponse) => {
      acc[teamResponse.data.id] = teamResponse.data;
      return acc;
    },
    {} as Record<string, ITeam>
  );

  const detailedMatches = allMatches.data.map((match: IMatch) => ({
    ...match,
    homeTeamDetails: teamDetailsMap[match.idTeamHome],
    awayTeamDetails: teamDetailsMap[match.idTeamAway],
  }));

  return (
    <div className="">
      <MatchesByRound detailedMatches={detailedMatches} maxRound={maxRound} />
    </div>
  );
}
