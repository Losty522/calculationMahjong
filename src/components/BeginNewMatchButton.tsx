"use client";
import Link from "next/link";
import { useFeildStatus, usePlayerStore } from "./playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import { useRouter } from "next/navigation";

const BeginNewMatchButton = () => {
  const router = useRouter();
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const fieldDataState = useGetFromStore(useFeildStatus, (state) => state);

  const handleBeginMatch = () => {
    //before move to matchMaking, initialize all data
    playerDataState?.initializeData();
    fieldDataState?.initializeData();
    router.push("/matchMaking");
  };
  return (
    <button
      className="w-11/12 border bg-red-300 text-3xl h-24 border-black text-center hover:bg-red-500 font-bold py-2 px-4 rounded"
      onClick={() => {
        handleBeginMatch();
      }}
    >
      Begin new match
    </button>
  );
};

export default BeginNewMatchButton;
