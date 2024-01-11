"use client";
import React, { useState } from "react";
import {
  PLAYER_INDEX,
  POSITION_INDEX,
  useFeildStatus,
  usePlayerStore,
} from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import Link from "next/link";
import PositionButton from "./PositionButton";
import { redirect, useRouter } from "next/navigation";

const MatchMaking = () => {
  const router = useRouter();
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const fieldDataState = useGetFromStore(useFeildStatus, (state) => state);
  const [message, setMessage] = useState("");
  const displayDirection = ["East", "South", "West", "North"];
  const handleResetStrage = () => {
    playerDataState?.updateRanking(); //update ranking
    fieldDataState?.changeOyaId(Number(playerDataState?.startPositonId[0])); //update OyaId\
    if (
      playerDataState?.playerData[PLAYER_INDEX.PLAYER1].userId &&
      playerDataState?.playerData[PLAYER_INDEX.PLAYER2].userId &&
      playerDataState?.playerData[PLAYER_INDEX.PLAYER3].userId &&
      playerDataState?.playerData[PLAYER_INDEX.PLAYER4].userId
    ) {
      router.push("/match");
    } else {
      setMessage("please set all players names");
    }
  };

  const handleShufflePosition = () => {
    if (!playerDataState?.startPositonId) return;
    const shuffledPosition = [...playerDataState?.startPositonId];
    for (let i = shuffledPosition.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPosition[i], shuffledPosition[j]] = [
        shuffledPosition[j],
        shuffledPosition[i],
      ];
    }
    playerDataState?.updateStartPosition(shuffledPosition);
    shuffledPosition.forEach((data, index) => {
      playerDataState.updatePlayerStartPositionFlag(data, index); //data is position, index is positon 0=east,1=south,2=West=,3=North
    });
  };

  return (
    <>
      <div>
        <Link href="/">Cancel</Link>
        <button
          type="button"
          className="border border-black mr-3"
          onClick={() => {
            handleShufflePosition();
          }}
        >
          change positon randomly
        </button>

        <button
          className="border border-black mr-3"
          type="button"
          onClick={() => {
            handleResetStrage();
          }}
        >
          Start Match
        </button>
        <p className="text-red-600">{message}</p>
        <br />
        <PositionButton playerId={PLAYER_INDEX.PLAYER1} />
        <PositionButton playerId={PLAYER_INDEX.PLAYER2} />
        <PositionButton playerId={PLAYER_INDEX.PLAYER3} />
        <PositionButton playerId={PLAYER_INDEX.PLAYER4} />
      </div>
    </>
  );
};

export default MatchMaking;
