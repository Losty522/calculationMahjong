"use client";

import { useGetFromStore } from "@/hooks/zustandHooks";
import {
  playerDataInterface,
  useFeildStatus,
  usePlayerStore,
} from "./playerStore";

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

  return (
    <div
      className={`border border-black mt-3 w-3/6 text-center ${
        props.playerDataObj.riichi ? "bg-red-200" : "bg-green-200"
      }`}
    >
      <div>Rank:{props.playerDataObj.rank}</div>
      <div>Player Name:{props.playerDataObj.playerName}</div>
      <div>point:{props.playerDataObj.point}</div>

      {props.playerDataObj.point >= 1000 || props.playerDataObj.riichi ? (
        props.playerDataObj.riichi ? (
          <button
            className="border border-black mt-1 mb-1 w-1/5 text-red-600"
            onClick={() => {
              handleCall();
            }}
          >
            Cancel
          </button>
        ) : (
          <button
            className="border border-black mt-1 mb-1 w-1/5"
            onClick={() => {
              handleCall();
            }}
          >
            Riichi
          </button>
        )
      ) : (
        <button className="border border-black mt-1 mb-1 w-1/5">
          Cannot Riich
        </button>
      )}
    </div>
  );
};

export default Player;
