"use client";

import Link from "next/link";
import Player from "./Player";
import { useFeildStatus, usePlayerStore } from "./playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";

const Field = () => {
  const handleResetStrage = () => {
    localStorage.removeItem("playerStoreData");
    localStorage.removeItem("FeildStatus");
  };

  const feildStatus = useGetFromStore(useFeildStatus, (state) => state);
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);

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

      <button
        className="border border-black"
        onClick={() => {
          handleResetStrage();
        }}
      >
        reset
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

      <div>round:{feildStatus?.round}</div>
      <div>Honba:{feildStatus?.honba}</div>
      <Player
        id={Number(playerDataState?.player1?.id)}
        playerName={playerDataState?.player1.playerName}
        point={playerDataState?.player1.point}
        calculatedPoints={playerDataState?.calculatedPoints}
      />
      <Player
        id={Number(playerDataState?.player2?.id)}
        playerName={playerDataState?.player2.playerName}
        point={playerDataState?.player2.point}
        calculatedPoints={playerDataState?.calculatedPoints}
      />
      <Player
        id={Number(playerDataState?.player3?.id)}
        playerName={playerDataState?.player3.playerName}
        point={playerDataState?.player3.point}
        calculatedPoints={playerDataState?.calculatedPoints}
      />
      <Player
        id={Number(playerDataState?.player4?.id)}
        playerName={playerDataState?.player4.playerName}
        point={playerDataState?.player4.point}
        calculatedPoints={playerDataState?.calculatedPoints}
      />
    </>
  );
};

export default Field;
