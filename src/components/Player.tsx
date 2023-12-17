"use client";
import React from "react";
import { usePlayerStore, usePlayerStore2 } from "@/components/playerStore";
type Props = {
  playerName: string;
};

const Player = (props: Props) => {
  const playerData = usePlayerStore();

  return (
    <div className="border border-black mt-3 w-3/6 text-center">
      <div>Player Name: {props.playerName}</div>
      <div>point:25000</div>
      <div>{playerData.playerName}</div>
      <div>{playerData.point}</div>
      <button onClick={() => playerData.calculatedPoints(-200)}>cul</button>
    </div>
  );
};

export default Player;
