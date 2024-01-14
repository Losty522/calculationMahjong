"use client";
import Link from "next/link";
import { useFeildStatus, usePlayerStore } from "./playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";

const BeginNewMatchButton = () => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const fieldDataState = useGetFromStore(useFeildStatus, (state) => state);

  const handleBeginMatch = () => {
    //before move to matchMaking, initialize all data
    playerDataState?.initializeData();
    fieldDataState?.initializeData();
  };
  return (
    <button
      onClick={() => {
        handleBeginMatch();
      }}
    >
      <Link href="/matchMaking">begin new match</Link>
    </button>
  );
};

export default BeginNewMatchButton;
