import React from "react";
import {
  instantMenuState,
  useAgariFormData,
  usePlayerStore,
} from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";

type Props = {
  playerIndex: number;
  playerName: string;
};

const InstantMenu = (props: Props) => {
  const agariStoreData = useAgariFormData();
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);

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
    <div>
      <button
        type="button"
        className="border border-black mr-1 ml-1"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Mangan);
        }}
      >
        Mangan
      </button>
      <button
        type="button"
        className="border border-black mr-1 ml-1"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Haneman);
        }}
      >
        Haneman
      </button>
      <button
        type="button"
        className="border border-black mr-1 ml-1"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Baiman);
        }}
      >
        Baiman
      </button>
      <button
        type="button"
        className="border border-black mr-1 ml-1"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Sanbaiman);
        }}
      >
        Sanbaiman
      </button>

      <button
        type="button"
        className="border border-black mr-1 ml-1"
        onClick={() => {
          handleChangeInstantMenu(instantMenuState.Yakuman);
        }}
      >
        Yakuman
      </button>

      {agariStoreData.agariData[props.playerIndex].han >= 13 && (
        <div>
          <label>How many yakuman</label>
          <button
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
            -
          </button>

          <input
            type="number"
            value={Number(
              agariStoreData.agariData[props.playerIndex].yakumanNum
            )}
            readOnly
          />
          <button
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
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default InstantMenu;
