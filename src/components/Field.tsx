"use client";

import Link from "next/link";
import Player from "./Player";
import { PLAYER_INDEX, useFeildStatus, usePlayerStore } from "./playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import { useEffect } from "react";

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

      <button
        className="border border-black"
        onClick={() => {
          handleResetStrage();
        }}
      >
        reset
      </button>

      <button
        className="border border-black"
        onClick={() => {
          playerDataState.updateRanking();
        }}
      >
        upDate rank
      </button>

      <br />

      <button
        className="border border-black"
        onClick={() => {
          feildStatus?.changeRound(1);
        }}
      >
        changeRound
      </button>

      <br />
      <br />
      <button
        onClick={() => {
          feildStatus?.changeHonba(1);
        }}
      >
        changeHonba
      </button>

      <div>StartPosition:{playerDataState?.startPositonId}</div>
      <div>Ranking:{playerDataState.playerOrder}</div>
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
