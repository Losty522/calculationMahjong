import React, { ChangeEvent } from "react";
import { useAgariFormData } from "../playerStore";

type Props = {
  playerData: { id: number; playerName: string; point: number };
};

const AgariPlayer = (props: Props) => {
  const agariData = useAgariFormData();

  const handleAgariPlayer = async (
    e: ChangeEvent<HTMLInputElement>,
    playerIndex: number
  ) => {
    agariData.changeAgariPlayer(Number(playerIndex), e.target.checked);

    const trueCount = agariData.agariPlayer.filter(
      //how many players did agari
      (value) => value === true
    ).length;

    if (trueCount > 0 && agariData.agariPlayer[playerIndex] == false) {
      //there are more than 2 agari players,agariWay must be RON
      agariData.changeAgariWay("RON");
    }

    //if agariplayer are less than 2 player, then reset the flag into false
    if (trueCount <= 2) {
      agariData.changeAgariFrom(Number(playerIndex), false);
    }

    return;
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={agariData.agariPlayer[Number(props.playerData.id)]}
        onChange={(e) => {
          handleAgariPlayer(e, Number(props.playerData.id));
        }}
      />
      {props.playerData.playerName}
    </label>
  );
};

export default AgariPlayer;
