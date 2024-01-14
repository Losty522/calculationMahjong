"use client";
import { usePlayerStore } from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import Link from "next/link";

const MatchResult = () => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  if (!playerDataState?.isMatchFinished) {
    //change matchFinished flag to true.
    playerDataState?.updateIsMatchFinished(true);
  }

  return (
    <>
      {playerDataState?.playerOrder.map((data, index) => (
        <div key={data} className="flex">
          <div>
            {playerDataState?.playerData[data].playerName}{" "}
            {playerDataState?.playerData[data].point}
          </div>
          <div>
            {"--->"}
            {playerDataState?.playerData[data].resultPoint}
          </div>
        </div>
      ))}
      <Link href={"/"}>Go Home</Link>
    </>
  );
};

export default MatchResult;
