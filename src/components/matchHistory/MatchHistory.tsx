"use client";
import {
  getAllMatchHistroyData,
  getAllMatchPlayerHistroyData,
} from "@/app/action/matchHistory/matchHistroyFunction";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight, FaTrophy } from "react-icons/fa";
import { PiBirdFill } from "react-icons/pi";

export type MatchHistroyType = {
  id: string;
  timestamp: number;
  returnFlag: boolean;
  placeBonus: number[];
  customBonus: number[];
};

export type MatchPlayerHistoryType = {
  id: string;
  point: number;
  resultPoint: number;
  userId: string;
  userName: string;
  matchResultId: string;
};

const MatchHistory = () => {
  const [matchHistoryData, setMatchHistoryData] =
    useState<MatchHistroyType[]>();

  const [matchPlayerHistoryData, setPlayerMatchHistoryData] =
    useState<MatchPlayerHistoryType[]>();

  useEffect(() => {
    const fetchMatchHistroyData = async () => {
      try {
        const matchData: MatchHistroyType[] = await getAllMatchHistroyData(); //get all match data
        setMatchHistoryData(matchData.reverse());
        const matchPlayerData: MatchPlayerHistoryType[] =
          await getAllMatchPlayerHistroyData();
        setPlayerMatchHistoryData(matchPlayerData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMatchHistroyData();
  }, []);

  const getDateBytimestap = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}${"_"}${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")} `;
    return formattedDate;
  };

  return (
    <div className="h-full w-11/12  mx-auto flex flex-col items-center text-center bg-green-100">
      <div className="text-center text-lg my-3 font-bold bg-green-400 w-11/12 rounded">
        MatchHistory page
      </div>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 mb-1 rounded"
      >
        Go Home
      </Link>

      <ul className="w-11/12">
        {matchHistoryData?.map((data) => (
          <li
            key={data.id}
            className=" bg-green-200 rounded w-11/12 mx-auto my-3"
          >
            <div className=" w-11/12 mx-auto text-left">
              <div className="my-1 font-bold">
                {getDateBytimestap(data.timestamp)}
              </div>
              <div className="my-1 flex">
                <p className="mr-4 font-bold">Bonus:</p>
                <div>
                  {data.placeBonus[0]} - {data.placeBonus[1]}
                </div>
              </div>
              <div className="my-1">
                {data.returnFlag ? (
                  <div className="flex">
                    <p className="mr-4 font-bold">Return:</p>
                    <p>30000</p>
                  </div>
                ) : (
                  <div className="flex">
                    <p className="mr-4 font-bold">Return:</p>
                    <p>25000</p>
                  </div>
                )}
              </div>
              <div>
                {matchPlayerHistoryData?.map((playerData, index) => {
                  if (playerData.matchResultId === data.id) {
                    return (
                      <div key={playerData.id} className="flex my-1">
                        {index % 4 === 0 ? (
                          <div className="flex">
                            <FaTrophy className="text-yellow-500" />
                            <p className="mr-1">1st</p>
                          </div>
                        ) : index % 4 === 1 ? (
                          <div className="flex">
                            <FaTrophy className="text-slate-500" />
                            <p className="mr-1">2nd</p>
                          </div>
                        ) : index % 4 === 2 ? (
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

                        <div className="mr-5">{playerData.userName}</div>
                        <div>{playerData.point}</div>
                        <FaArrowRight className="mt-1 mx-1" />
                        <div>{playerData.resultPoint} pt</div>
                      </div>
                    );
                  }
                  return;
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchHistory;
