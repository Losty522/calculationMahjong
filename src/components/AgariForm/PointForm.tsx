import React, { useEffect } from "react";
import { AGARI_WAY, instantMenuState, useAgariFormData } from "../playerStore";
import InstantMenu from "./InstantMenu";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  playerIndex: number;
  playerName: string;
};

const PointForm = (props: Props) => {
  const agariStoreData = useAgariFormData();

  // useEffect(() => {
  //   console.log(agariStoreData);
  //   console.log(agariStoreData.agariWay);
  // }, [agariStoreData, agariStoreData.agariWay]);

  return (
    <div className="bg-blue-100  w-11/12 mb-2 rounded">
      <h2>Player: {props.playerName}</h2>

      <label htmlFor="Fu">Fu</label>
      <button
        className="mx-1"
        type="button"
        onClick={() => {
          const trueCount = agariStoreData.agariPlayer.filter(
            (value) => value === true
          ).length;
          if (
            //if fu is already 25 and player are more than 2 or not tsumo.
            agariStoreData.agariData[props.playerIndex].fuIndex == 1 &&
            (trueCount >= 2 || !agariStoreData.agariWay[AGARI_WAY.TSUMO])
          )
            return;

          if (
            //fu 30 and han 1
            agariStoreData.agariData[props.playerIndex].fuIndex == 2 &&
            agariStoreData.agariData[props.playerIndex].han <= 2
          ) {
            agariStoreData.changeFu(props.playerIndex, -1);
            if (agariStoreData.agariWay[AGARI_WAY.TSUMO]) {
              agariStoreData.changeHan(
                props.playerIndex,
                -agariStoreData.agariData[props.playerIndex].han + 3
              ); //reset 3 han
            } else {
              agariStoreData.changeHan(
                props.playerIndex,
                -agariStoreData.agariData[props.playerIndex].han + 2
              ); //reset 2 han
            }
            return;
          }

          if (agariStoreData.agariData[props.playerIndex].fuIndex >= 1) {
            agariStoreData.changeFu(props.playerIndex, -1);
          }
        }}
      >
        <FaMinus />
      </button>
      <input
        className="text-center"
        name="Fu"
        type="number"
        value={
          agariStoreData.fuDisplay[
            agariStoreData.agariData[props.playerIndex].fuIndex
          ]
        }
        step={10}
        min={20}
        max={110}
        readOnly
      />
      <button
        className="mx-1"
        type="button"
        onClick={() => {
          if (agariStoreData.agariData[props.playerIndex].fuIndex <= 9) {
            agariStoreData.changeFu(props.playerIndex, 1);
            if (agariStoreData.agariData[props.playerIndex].fuIndex == 0) {
              agariStoreData.changeHan(
                props.playerIndex,
                -agariStoreData.agariData[props.playerIndex].han + 3
              ); //reset 3 han
            }
          }
        }}
      >
        <FaPlus />
      </button>

      <label htmlFor="Han" className="ml-4">
        Han
      </label>
      <button
        type="button"
        className="mx-1"
        onClick={() => {
          if (
            // case of tsumo and 20fu and han is more than 2
            agariStoreData.agariWay[AGARI_WAY.TSUMO] &&
            agariStoreData.agariData[props.playerIndex].fuIndex == 0 &&
            agariStoreData.agariData[props.playerIndex].han <= 2
          ) {
            return;
          }

          if (
            // case of tsumo and 25fu and han is more than 3
            agariStoreData.agariWay[AGARI_WAY.TSUMO] &&
            agariStoreData.agariData[props.playerIndex].fuIndex == 1 &&
            agariStoreData.agariData[props.playerIndex].han <= 3
          ) {
            return;
          }

          if (
            // case of tsumo and 25fu and han is more than 3
            agariStoreData.agariWay[AGARI_WAY.RON] &&
            agariStoreData.agariData[props.playerIndex].fuIndex == 1 &&
            agariStoreData.agariData[props.playerIndex].han <= 2
          ) {
            return;
          }

          if (agariStoreData.agariData[props.playerIndex].han >= 2) {
            agariStoreData.changeHan(props.playerIndex, -1);
          }
        }}
      >
        <FaMinus />
      </button>
      <input
        className="text-center"
        name="Han"
        type="number"
        value={agariStoreData.agariData[props.playerIndex].han}
        step={1}
        min={1}
        max={13}
        readOnly
      />
      <button
        className="mx-1"
        type="button"
        onClick={() => {
          if (agariStoreData.agariData[props.playerIndex].han <= 12) {
            agariStoreData.changeHan(props.playerIndex, 1);
          }
        }}
      >
        <FaPlus />
      </button>

      <InstantMenu
        playerName={props.playerName}
        playerIndex={props.playerIndex}
      />
    </div>
  );
};

export default PointForm;
