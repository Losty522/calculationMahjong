"use client";

import Link from "next/link";
import Player from "./Player";
import { PLAYER_INDEX, useFeildStatus, usePlayerStore } from "./playerStore";
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
      <div>OyaId:{feildStatus?.oyaId}</div>
      <Player
        id={Number(playerDataState?.playerData[PLAYER_INDEX.PLAYER1].id)}
        playerName={
          playerDataState?.playerData[PLAYER_INDEX.PLAYER1].playerName
        }
        point={playerDataState?.playerData[PLAYER_INDEX.PLAYER1].point}
        calculatedPoints={playerDataState?.calculatedPoints}
      />
      <Player
        id={Number(playerDataState?.playerData[PLAYER_INDEX.PLAYER2].id)}
        playerName={
          playerDataState?.playerData[PLAYER_INDEX.PLAYER2].playerName
        }
        point={playerDataState?.playerData[PLAYER_INDEX.PLAYER2].point}
        calculatedPoints={playerDataState?.calculatedPoints}
      />
      <Player
        id={Number(playerDataState?.playerData[PLAYER_INDEX.PLAYER3].id)}
        playerName={
          playerDataState?.playerData[PLAYER_INDEX.PLAYER3].playerName
        }
        point={playerDataState?.playerData[PLAYER_INDEX.PLAYER3]?.point}
        calculatedPoints={playerDataState?.calculatedPoints}
      />
      <Player
        id={Number(playerDataState?.playerData[PLAYER_INDEX.PLAYER4].id)}
        playerName={
          playerDataState?.playerData[PLAYER_INDEX.PLAYER4].playerName
        }
        point={playerDataState?.playerData[PLAYER_INDEX.PLAYER4].point}
        calculatedPoints={playerDataState?.calculatedPoints}
      />
    </>
  );
};

export default Field;
