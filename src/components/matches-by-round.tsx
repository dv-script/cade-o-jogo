"use client";
import { IMatch } from "@/types/IMatch";
import { Button } from "@nextui-org/react";
import { useRef, useState } from "react";
import { MatchesCard } from "@/components/matches-card";
import { BsCaretLeft, BsCaretRight } from "react-icons/bs";

interface IMatchesByRoundProps {
  detailedMatches: IMatch[];
  maxRound: number;
}

export function MatchesByRound({
  detailedMatches,
  maxRound,
}: IMatchesByRoundProps) {
  const initialRound =
    detailedMatches.find((match: IMatch) => match.gameTime === "Não Inic.")
      ?.round || 1;
  const [currentRound, setCurrentRound] = useState(initialRound);

  const matchesFilteredByRound = detailedMatches.filter(
    (match: IMatch) => match.round === currentRound
  );

  const scrollDiv = useRef<HTMLDivElement>(null);

  const handlePreviousPage = () => {
    if (scrollDiv.current) {
      scrollDiv.current?.scrollBy({ left: -100 });
    }
  };

  const handleNextPage = () => {
    if (scrollDiv.current) {
      scrollDiv.current?.scrollBy({ left: 100 });
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center p-4 w-full max-w-[1300px] mx-auto">
        <Button radius="full" isIconOnly onClick={handlePreviousPage}>
          <BsCaretLeft />
        </Button>
        <div
          ref={scrollDiv}
          className="flex items-center gap-2 p-1 overflow-x-scroll scrollbar-hide"
        >
          {Array.from({ length: maxRound }, (_, i) => i + 1).map((round) => (
            <Button
              key={round}
              onClick={() => setCurrentRound(round)}
              color={round === currentRound ? "primary" : "default"}
            >
              {round} Rodada
            </Button>
          ))}
        </div>
        <Button radius="full" isIconOnly onClick={handleNextPage}>
          <BsCaretRight />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 py-4 max-w-[1300px] mx-auto">
        <MatchesCard matchesFilteredByRound={matchesFilteredByRound} />
      </div>
    </div>
  );
}
