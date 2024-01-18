"use client";

import { useGetFromStore } from "@/hooks/zustandHooks";
import {
  playerDataInterface,
  useFeildStatus,
  usePlayerStore,
} from "./playerStore";
import { useEffect, useState } from "react";

type PlayerType = {
  id: number;
  playerName: string;
  point: number;
  calculatedPoints: (id: number, number: number) => void;
};

type Props = {
  playerDataObj: playerDataInterface;
};

const Player = (props: Props) => {
  const fieldDataState = useGetFromStore(useFeildStatus, (state) => state);
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const [position, setPosition] = useState<string>("");

  useEffect(() => {
    getPosition();
  }, [fieldDataState?.oyaId]);

  const handleCall = () => {
    if (props.playerDataObj.riichi) {
      playerDataState?.calculatedPoints(props.playerDataObj.id, 1000);
      playerDataState?.changeRiici(props.playerDataObj.id, false);
      fieldDataState?.changeChips(-1);
    } else {
      playerDataState?.calculatedPoints(props.playerDataObj.id, -1000);
      playerDataState?.changeRiici(props.playerDataObj.id, true);
      fieldDataState?.changeChips(1);
    }
  };

  const getPosition = () => {
    let positionArr;
    if (
      playerDataState?.startPositonId.findIndex(
        (id) => id === fieldDataState?.oyaId
      ) === 0
    ) {
      positionArr = ["E", "S", "W", "N"];
    } else if (
      playerDataState?.startPositonId.findIndex(
        (id) => id === fieldDataState?.oyaId
      ) === 1
    ) {
      positionArr = ["N", "E", "S", "W"];
    } else if (
      playerDataState?.startPositonId.findIndex(
        (id) => id === fieldDataState?.oyaId
      ) === 2
    ) {
      positionArr = ["W", "N", "E", "S"];
    } else if (
      playerDataState?.startPositonId.findIndex(
        (id) => id === fieldDataState?.oyaId
      ) === 3
    ) {
      positionArr = ["S", "W", "N", "E"];
    } else {
      positionArr = ["E", "S", "W", "N"];
    }
    setPosition(positionArr[props.playerDataObj.id]);
    return;
  };

  return (
    <div
      className={`border border-black mt-3 w-2/6 text-center rounded ${
        props.playerDataObj.riichi ? "bg-red-200" : "bg-green-200"
      }`}
    >
      <div className="flex justify-between ml-3 mr-3">
        <div>Rank:{props.playerDataObj.rank}</div>
        {position === "E" ? (
          <div className="text-red-500">{position}</div>
        ) : (
          <div>{position}</div>
        )}
      </div>
      <div>{props.playerDataObj.playerName}</div>
      <div>{props.playerDataObj.point}</div>

      {props.playerDataObj.point >= 1000 || props.playerDataObj.riichi ? (
        props.playerDataObj.riichi ? (
          <button
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-1 mb-1 rounded"
            onClick={() => {
              handleCall();
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 mb-1 rounded"
            onClick={() => {
              handleCall();
            }}
          >
            Riichi
          </button>
        )
      ) : (
        <button className="bg-yellow-400 text-red-600 py-1 px-1 mb-1 rounded">
          No Riich
        </button>
      )}
    </div>
  );
};

export default Player;
