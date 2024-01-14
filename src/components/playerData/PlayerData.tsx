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
    <div>
      <div>PlayerData</div>
      {allPlayerData?.map((data, index) => (
        <div key={index} className="border border-black mb-3">
          <div>UserName: {data.userName}</div>
          <div>MatchTimes: {data.matchTimes}</div>
          <div>TotalPoints: {data.totalResultPoints}</div>
          <div>AveragePoints: {data.averagePoints}</div>
          <div>AveragePlace: {data.averagePlace}</div>
          <div>
            1st: {data.placeResult[0]} 2nd: {data.placeResult[1]} 3rd:
            {data.placeResult[2]} 4th: {data.placeResult[3]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerData;
