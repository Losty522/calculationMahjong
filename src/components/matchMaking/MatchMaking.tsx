"use client";
import React, { useEffect, useState } from "react";
import {
  PLAYER_INDEX,
  POSITION_INDEX,
  useFeildStatus,
  usePlayerStore,
} from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import Link from "next/link";
import PositionButton from "./PositionButton";
import { useRouter } from "next/navigation";
import CreateUser from "./CreateUser";
import { getAllUsers } from "../../app/action/matchMaking/userDataFunction";

const MatchMaking = () => {
  const router = useRouter();
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const fieldDataState = useGetFromStore(useFeildStatus, (state) => state);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<{ id: string; userName: string }[]>();

  // get all users data
  const fetchUsers = async () => {
    try {
      const allUsers = await getAllUsers(); //get all users data from prisma
      await setUsers(allUsers); //set all users data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  //this match is already finished, go back to the home.
  if (playerDataState?.isMatchFinished) {
    return;
  }

  return (
    <>
      <CreateUser setUsers={setUsers} />
      <div>
        <div className="text-center font-bold">Select 4 player names.</div>
        <PositionButton playerId={PLAYER_INDEX.PLAYER1} users={users} />
        <PositionButton playerId={PLAYER_INDEX.PLAYER2} users={users} />
        <PositionButton playerId={PLAYER_INDEX.PLAYER3} users={users} />
        <PositionButton playerId={PLAYER_INDEX.PLAYER4} users={users} />
      </div>

      <button
        type="button"
        className="border border-black bg-slate-400 rounded w-4/12 py-2 px-3"
        onClick={() => {
          handleShufflePosition();
        }}
      >
        Positon Random
      </button>
      <p className="text-red-600 text-center">{message}</p>
      <div className="flex w-6/12 justify-between text-center">
        <button
          className="border border-black bg-blue-400 rounded w-full py-2 px-3 mr-6"
          type="button"
          onClick={() => {
            handleResetStrage();
          }}
        >
          Start
        </button>

        <Link
          href="/"
          className="border border-black bg-red-500 rounded w-full py-2 px-3"
        >
          Cancel
        </Link>
      </div>
    </>
  );
};

export default MatchMaking;
