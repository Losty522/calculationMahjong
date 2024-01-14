"use client";
import {
  getAllMatchHistroyData,
  getAllMatchPlayerHistroyData,
} from "@/app/action/matchHistory/matchHistroyFunction";
import { useEffect, useState } from "react";

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
        setMatchHistoryData(matchData);
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
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    return formattedDate;
  };

  return (
    <div>
      <ul>
        {matchHistoryData?.map((data) => (
          <li key={data.id} className="border border-black mb-3">
            <div>
              date:{getDateBytimestap(data.timestamp)} bonus:
              {data.placeBonus[0]}-{data.placeBonus[1]}{" "}
              {data.returnFlag ? "return3000" : "return 25000"}
            </div>
            <div>
              {matchPlayerHistoryData?.map((playerData) => {
                if (playerData.matchResultId === data.id) {
                  return (
                    <div key={playerData.id}>
                      {playerData.userName}-{playerData.point}-
                      {playerData.resultPoint}
                    </div>
                  );
                }
                return;
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchHistory;
