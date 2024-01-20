"use client";
import { usePlayerStore } from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa";
import { PiBirdFill } from "react-icons/pi";

const MatchResult = () => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  if (!playerDataState?.isMatchFinished) {
    //change matchFinished flag to true.
    playerDataState?.updateIsMatchFinished(true);
  }

  return (
    <div className=" h-screen w-11/12 mx-auto flex flex-col items-center text-center bg-green-100">
      <div className="text-center text-lg my-1 font-bold bg-green-400 w-11/12 rounded">
        Match Result
      </div>
      <div className="my-1 bg-green-200 rounded w-11/12 ">
        {playerDataState?.playerOrder.map((data, index) => (
          <div key={data} className="flex justify-center my-3">
            {index === 0 ? (
              <div className="flex">
                <FaTrophy className="text-yellow-500" />
                <p>1st</p>
              </div>
            ) : index === 1 ? (
              <div className="flex">
                <FaTrophy className="text-slate-500" />
                <p className="mr-1">2nd</p>
              </div>
            ) : index === 2 ? (
              <div className="flex">
                <FaTrophy className="text-amber-600" />
                <p className="mr-1">3rd</p>
              </div>
            ) : (
              <div className="flex">
                <PiBirdFill className="text-yellow-600" />
                <p className="mr-1">4th</p>
              </div>
            )}
            <div className="mx-2">
              {playerDataState?.playerData[data].playerName}
            </div>
            <div>{playerDataState?.playerData[data].point}</div>
            <FaArrowRight className="mt-1 mx-1" />
            <div>{playerDataState?.playerData[data].resultPoint} pt</div>
          </div>
        ))}
      </div>
      <Link
        href={"/"}
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 mb-1 rounded my-2"
      >
        Go Home
      </Link>
    </div>
  );
};

export default MatchResult;
