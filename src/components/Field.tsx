"use client";

import Link from "next/link";
import Player from "./Player";
import { PLAYER_INDEX, useFeildStatus, usePlayerStore } from "./playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import { useEffect } from "react";
import FinishedMatch from "./FinishedMatch";

const Field = () => {
  const feildStatus = useGetFromStore(useFeildStatus, (state) => state);
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);

  const handleResetStrage = () => {
    feildStatus?.initializeData(); //reset all data
    playerDataState?.initializeData(); //reset all data

    //router.push("/matchMaking");
  };

  if (!playerDataState) {
    return null;
  }
  const handleAgari = () => {
    // next create agari functiona
  };
  //this match is already finished, go back to the home.
  if (playerDataState?.isMatchFinished) {
    return <FinishedMatch />;
  }
  return (
    <>
      <Link href="/agariForm">
        <button
          className="border border-black"
          onClick={() => {
            handleAgari();
          }}
        >
          Agari
        </button>
      </Link>

      <Link href="/draw">
        <button className="border border-black">Draw</button>
      </Link>

      <Link href="/editMatchBonus">
        <button
          className="border border-black"
          onClick={() => {
            playerDataState.updateRanking();
          }}
        >
          Finish
        </button>
      </Link>

      <div>round:{feildStatus?.round}</div>
      <div>roundDisplay:{feildStatus?.displayRound[feildStatus?.round]}</div>

      <div>Honba:{feildStatus?.honba}</div>
      <div>OyaId:{feildStatus?.oyaId}</div>
      <div>Chips:{feildStatus?.chips}</div>

      {playerDataState?.startPositonId.map((data) => (
        <div key={playerDataState?.playerData[data].id}>
          <Player playerDataObj={playerDataState?.playerData[data]} />
        </div>
      ))}
    </>
  );
};

export default Field;
