import { IMatch } from "@/types/IMatch";
import { formatDateAbbreviation } from "@/utils/formatDateAbbreviation";
import { Tooltip } from "@nextui-org/react";
import teamWithoutLogo from "@/assets/teamWithoutImage.png";
import Image from "next/image";

interface IMatchCardProps {
  matchesFilteredByRound: IMatch[];
}

export function MatchesCard({ matchesFilteredByRound }: IMatchCardProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {matchesFilteredByRound.map((match: IMatch) => {
        const isLive = match.realtime;
        const notStarted = match.gameTime === "Não Inic.";

        return (
          <div
            key={match.id}
            className="flex-1 min-w-80 flex flex-col flex-nowrap gap-4 py-6 px-4 mx-2 bg-zinc-900 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm whitespace-nowrap">
                {formatDateAbbreviation(new Date(match.isoDate))}
              </span>
              <span className="text-sm whitespace-nowrap text-zinc-500">
                {match.stadium}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="flex flex-row gap-4 justify-center items-center font-bold text-xl text-zinc-600">
                <div className="flex items-center gap-2">
                  <Image
                    src={match.homeTeamDetails?.urlLogo || teamWithoutLogo.src}
                    alt={`Logo ${match.homeTeamDetails?.name}`}
                    draggable={false}
                    width={40}
                    height={40}
                  />
                  <Tooltip
                    content={match.homeTeamDetails?.name}
                    color="default"
                    radius="sm"
                  >
                    <span className="font-semibold text-zinc-400">
                      {match.homeTeamDetails?.initials}
                    </span>
                  </Tooltip>
                </div>
                {!notStarted ? (
                  <div className="flex items-center gap-1 text-zinc-200">
                    <span>{match.gameScore.goalsHome}</span>
                    <span>x</span>
                    <span>{match.gameScore.goalsAway}</span>
                  </div>
                ) : (
                  <span>x</span>
                )}
                <div className="flex items-center gap-2">
                  <Tooltip
                    content={match.awayTeamDetails?.name}
                    color="default"
                    radius="sm"
                  >
                    <span className="font-semibold text-zinc-400">
                      {match.awayTeamDetails?.initials &&
                      match.awayTeamDetails?.initials?.length > 2
                        ? match.awayTeamDetails?.initials
                        : match.awayTeamDetails?.initials}
                    </span>
                  </Tooltip>
                  <Image
                    src={match.awayTeamDetails?.urlLogo || teamWithoutLogo.src}
                    alt={`Logo ${match.awayTeamDetails?.name}`}
                    draggable={false}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              {isLive ? (
                <div className="flex flex-row gap-1 text-sm w-fit items-center bg-red-600 text-white rounded-xl px-2 py-1">
                  <span className="rounded-full bg-white w-2 h-2"></span>
                  <span>Live</span>
                </div>
              ) : (
                <p className="text-sm">{match.gameTime}</p>
              )}
              <div className="flex flex-col gap-2 justify-center mt-4 w-full">
                <div className="relative text-center">
                  <span className="relative z-10 bg-zinc-900 text-white px-2">
                    {match.gameTime === "Não Inic."
                      ? "Onde assistir"
                      : "Onde passou"}
                  </span>
                  <div className="absolute top-1/2 w-full border-b border-zinc-600"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
