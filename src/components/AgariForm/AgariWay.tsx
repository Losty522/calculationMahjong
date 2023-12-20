import React from "react";
import { useAgariFormData } from "../playerStore";

const AgariWay = () => {
  const agariData = useAgariFormData();

  const handleChangeAgariWay = (wayText: "TSUMO" | "RON") => {
    agariData.changeAgariWay(wayText);

    if (wayText == "TSUMO") {
      agariData.agariData.forEach((data, index) => {
        agariData.changeFu(index, 20 - data.fu);
        agariData.changeHan(index, 2 - data.han);

        agariData.changeAgariPlayer(index, false);
      });
    } else {
      agariData.agariData.forEach((data, index) => {
        agariData.changeFu(index, 30 - data.fu);
        agariData.changeHan(index, 1 - data.han);
      });
    }
  };

  return (
    <>
      <label>
        <input
          type="radio"
          name="agariWay"
          checked={Boolean(agariData.agariWay[0])}
          onChange={() => handleChangeAgariWay("TSUMO")}
        />
        Tsumo
      </label>

      <label>
        <input
          type="radio"
          name="agariWay"
          checked={Boolean(agariData.agariWay[1])}
          onChange={() => handleChangeAgariWay("RON")}
        />
        Ron
      </label>
    </>
  );
};

export default AgariWay;
