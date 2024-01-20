import React, { ChangeEvent } from "react";
import { useAgariFormData } from "../playerStore";

type Props = {
  playerData: { id: number; playerName: string; point: number };
};

const AgariFrom = (props: Props) => {
  const agariData = useAgariFormData();

  const handleAgariFrom = async (
    e: ChangeEvent<HTMLInputElement>,
    playerIndex: number
  ) => {
    agariData.changeAgariFrom(Number(playerIndex), e.target.checked);

    return;
  };

  // if the player is already agari, must not display from form.
  if (agariData.agariPlayer[Number(props.playerData.id)]) {
    return null;
  }

  return (
    <label className=" rounded my-1">
      <input
        className="ml-4"
        type="checkbox"
        checked={agariData.agariFrom[Number(props.playerData.id)]}
        onChange={(e) => {
          handleAgariFrom(e, Number(props.playerData.id));
        }}
      />
      {props.playerData.playerName}
    </label>
  );
};

export default AgariFrom;
