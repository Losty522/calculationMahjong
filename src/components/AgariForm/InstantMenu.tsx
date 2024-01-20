import React from "react";
import { instantMenuState, useAgariFormData } from "../playerStore";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  playerIndex: number;
  playerName: string;
};

const InstantMenu = (props: Props) => {
  const agariStoreData = useAgariFormData();

  const handleChangeInstantMenu = (MenuState: number) => {
    const changeFuAndHan = (han: number) => {
      agariStoreData.changeHan(
        props.playerIndex,
        han - agariStoreData.agariData[props.playerIndex].han
      );
    };

    if (MenuState == instantMenuState.None) {
      //nothing
    } else if (MenuState == instantMenuState.Mangan) {
      changeFuAndHan(5);
    } else if (MenuState == instantMenuState.Haneman) {
      changeFuAndHan(6);
    } else if (MenuState == instantMenuState.Baiman) {
      changeFuAndHan(9);
    } else if (MenuState == instantMenuState.Sanbaiman) {
      changeFuAndHan(11);
    } else if (MenuState == instantMenuState.Yakuman) {
      changeFuAndHan(13);
    }
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-1 mr-1 rounded text-sm"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Mangan);
        }}
      >
        Mangan
      </button>
      <button
        type="button"
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-1 mr-1 rounded text-sm"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Haneman);
        }}
      >
        Haneman
      </button>
      <button
        type="button"
        className="bg-red-500 hover:bg-red-600 text-white py-1 px-1 mr-1 rounded text-sm"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Baiman);
        }}
      >
        Baiman
      </button>
      <button
        type="button"
        className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-1 mr-1 rounded text-sm"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Sanbaiman);
        }}
      >
        Sanbaiman
      </button>

      <button
        type="button"
        className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-1 mr-1 rounded text-sm"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Yakuman);
        }}
      >
        Yakuman
      </button>

      {agariStoreData.agariData[props.playerIndex].han >= 13 && (
        <div>
          <label>How many times</label>
          <button
            className="mx-1"
            type="button"
            onClick={() => {
              if (
                Number(
                  agariStoreData.agariData[props.playerIndex].yakumanNum
                ) >= 2
              ) {
                agariStoreData.changeYakumanNum(props.playerIndex, -1);
              }
            }}
          >
            <FaMinus />
          </button>

          <input
            className="text-center"
            type="number"
            value={Number(
              agariStoreData.agariData[props.playerIndex].yakumanNum
            )}
            step={1}
            min={1}
            max={9}
            readOnly
          />
          <button
            className="mx-1"
            type="button"
            onClick={() => {
              if (
                Number(
                  agariStoreData.agariData[props.playerIndex].yakumanNum
                ) <= 8
              ) {
                agariStoreData.changeYakumanNum(props.playerIndex, 1);
              }
            }}
          >
            <FaPlus />
          </button>
        </div>
      )}
    </div>
  );
};

export default InstantMenu;
