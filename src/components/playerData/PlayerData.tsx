"use client";

import { useEffect, useState } from "react";
import {
  MatchHistroyType,
  MatchPlayerHistoryType,
} from "../matchHistory/MatchHistory";
import {
  getAllMatchHistroyData,
  getAllMatchPlayerHistroyData,
} from "@/app/action/matchHistory/matchHistroyFunction";
import { getAllUsers } from "@/app/action/matchMaking/userDataFunction";
import Link from "next/link";
import { FaTrophy } from "react-icons/fa";
import { PiBirdFill } from "react-icons/pi";

type UserType = {
  id: string;
  userName: string;
};

type PlayerDataType = {
  userName: string;
  matchTimes: number;
  totalResultPoints: number;
  averagePoints: number;
  placeResult: number[];
  averagePlace: number;
};

const PlayerData = () => {
  //const allPlayerData: PlayerDataType[] = [];
  const [allPlayerData, setAllPlayerData] = useState<PlayerDataType[]>([]);
  let ignore = false;
  useEffect(() => {
    const fetchMatchHistroyData = async () => {
      try {
        const allUsersData: UserType[] | undefined = await getAllUsers();
        const matchPlayerData: MatchPlayerHistoryType[] =
          await getAllMatchPlayerHistroyData();
        allUsersData?.forEach((data, index) => {
          const tempObj: PlayerDataType = {
            userName: "",
            matchTimes: 0,
            totalResultPoints: 0,
            averagePoints: 0,
            placeResult: [0, 0, 0, 0],
            averagePlace: 0,
          };
          //get specific player match data
          const matchData = matchPlayerData.filter(
            (matchData) => matchData.userId === data.id
          );

          //get place data
          matchPlayerData?.forEach((matchData, index) => {
            if (matchData.userId === data.id) {
              const place = index % 4; //check place
              tempObj.placeResult[place]++;
            }
            //save place total number,after loop , divide by matchtimes
            if (matchPlayerData?.length - 1 === index) {
              tempObj.placeResult.forEach((data, index) => {
                tempObj.averagePlace += data * (index + 1); //
                if (tempObj.placeResult.length - 1 === index) {
                  tempObj.averagePlace = tempObj.averagePlace;
                }
              });
            }
          });

          //calulate place average
          tempObj.averagePlace = parseFloat(
            (tempObj.averagePlace / matchData.length).toFixed(2)
          );

          matchData.forEach((data, index) => {
            if (index === 0) {
              tempObj.userName = data.userName;
              tempObj.matchTimes = matchData.length;
            }
            tempObj.totalResultPoints = parseFloat(
              (tempObj.totalResultPoints + data.resultPoint).toFixed(1)
            );
            //at last, calculate average point
            if (matchData.length - 1 === index) {
              tempObj.averagePoints = parseFloat(
                (tempObj.totalResultPoints / matchData.length).toFixed(1)
              );
              //allPlayerData.push(tempObj);
            }
          });
          //console.log(tempObj);
          //allPlayerData.push(tempObj);
          setAllPlayerData((prev) => [...prev, tempObj]);
          //console.log(allPlayerData);
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (!ignore) {
      fetchMatchHistroyData();
    }
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="h-full w-11/12  mx-auto flex flex-col items-center text-center bg-green-100">
      <div className="text-center text-lg my-3 font-bold bg-green-400 w-11/12 rounded">
        PlayerData
      </div>
      <Link
        href="/"
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 mb-1 rounded"
      >
        Go Home
      </Link>

      {allPlayerData?.map((data, index) =>
        data.userName === "" || data.matchTimes === 0 ? (
          ""
        ) : (
          <div
            key={index}
            className=" bg-green-200 rounded w-11/12 mx-auto my-3"
          >
            <div className=" w-11/12 mx-auto text-left">
              <div className="flex w-2/12 justify-between mb-1">
                <div className="font-bold">UserName:</div>
                <div>{data.userName}</div>
              </div>
              <div className="flex w-2/12 justify-between mb-1">
                <div className="font-bold">MatchTimes:</div>
                <div>{data.matchTimes}</div>
              </div>
              <div className="flex w-2/12 justify-between mb-1">
                <div className="font-bold">TotalPoints:</div>
                <div>{data.totalResultPoints}</div>
              </div>
              <div className="flex w-2/12 justify-between mb-1">
                <div className="font-bold">AveragePoints:</div>
                <div>{data.averagePoints}</div>
              </div>
              <div className="flex w-2/12 justify-between mb-1">
                <div className="font-bold">AveragePlace:</div>
                <div>{data.averagePlace}</div>
              </div>
              <div className="flex ">
                <FaTrophy className="text-yellow-500" />
                <div className="mr-3">
                  <span className="font-bold mr-1">1st:</span>
                  {data.placeResult[0]}
                </div>
                <FaTrophy className="text-slate-500" />
                <div className="mr-3">
                  <span className="font-bold mr-1">2nd:</span>
                  {data.placeResult[1]}
                </div>
                <FaTrophy className="text-amber-600" />
                <div className="mr-3">
                  <span className="font-bold mr-1">3rd:</span>
                  {data.placeResult[2]}
                </div>
                <PiBirdFill className="text-yellow-600" />
                <div className="mr-3">
                  <span className="font-bold mr-1">4th:</span>
                  {data.placeResult[3]}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PlayerData;
