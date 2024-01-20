"use client";

import Link from "next/link";
import Player from "./Player";
import { PLAYER_INDEX, useFeildStatus, usePlayerStore } from "./playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import { useEffect } from "react";
import FinishedMatch from "./FinishedMatch";
import Image from "next/image";

const Field = () => {
  const feildStatus = useGetFromStore(useFeildStatus, (state) => state);
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);

  if (!playerDataState) {
    return null;
  }
  //this match is already finished, go back to the home.
  if (playerDataState?.isMatchFinished) {
    return <FinishedMatch />;
  }
  return (
    <div className=" h-screen">
      <div className="flex justify-between mt-1 mx-1 ">
        <Link href="/agariForm">
          <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Agari
          </button>
        </Link>

        <Link href="/draw">
          <button className="bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 ml-1 rounded">
            Draw
          </button>
        </Link>

        <Link href="/editData">
          <button className="bg-yellow-700 hover:bg-yellow-800 text-white py-2 px-4 ml-1 rounded">
            Edit Data
          </button>
        </Link>

        <Link href="/editMatchBonus">
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 ml-1 rounded"
            onClick={() => {
              playerDataState.updateRanking();
            }}
          >
            Finish
          </button>
        </Link>
      </div>
      <div className="flex bg-lime-500 border border-amber-800  justify-between mx-auto my-1 w-3/6 rounded">
        <div className="text-xl ml-2">
          {feildStatus?.displayRound[feildStatus?.round]}
        </div>
        <div className="flex text-xl">
          <Image
            className="h-full w-full"
            src={`/images/honba.png`}
            alt={`east image`}
            width={10}
            height={10}
          />
          <div className="ml-1">{feildStatus?.honba}</div>
        </div>
        <div className="flex text-xl mr-2">
          <Image
            className="h-full w-full"
            src={`/images/chips.png`}
            alt={`east image`}
            width={10}
            height={10}
          />
          <div className="ml-1">{feildStatus?.chips}</div>
        </div>
      </div>

      <div className="flex flex-col w-11/12 mx-auto items-center">
        <Player
          playerDataObj={
            playerDataState?.playerData[playerDataState?.startPositonId[0]]
          }
        />

        <div className="flex w-full justify-between">
          <Player
            playerDataObj={
              playerDataState?.playerData[playerDataState?.startPositonId[1]]
            }
          />
          <Player
            playerDataObj={
              playerDataState?.playerData[playerDataState?.startPositonId[3]]
            }
          />
        </div>
        <Player
          playerDataObj={
            playerDataState?.playerData[playerDataState?.startPositonId[2]]
          }
        />
      </div>
    </div>
  );
};

export default Field;
