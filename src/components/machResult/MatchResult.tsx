"use client";
import React from "react";
import { usePlayerStore } from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";

const MatchResult = () => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
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
    </>
  );
};

export default MatchResult;
