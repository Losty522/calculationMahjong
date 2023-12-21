import React, { useEffect } from "react";
import { AGARI_WAY, instantMenuState, useAgariFormData } from "../playerStore";

type Props = {
  playerIndex: number;
  playerName: string;
};

const PointForm = (props: Props) => {
  const agariStoreData = useAgariFormData();

  useEffect(() => {
    console.log(agariStoreData);
    console.log(agariStoreData.agariWay);
  }, [agariStoreData, agariStoreData.agariWay]);

  return (
    <>
      <h2>Player: {props.playerName}</h2>

      <label htmlFor="Fu">Fu</label>
      <button
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
        -
      </button>
      <input
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
        +
      </button>

      <label htmlFor="Han">Han</label>
      <button
        type="button"
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
        -
      </button>
      <input
        name="Han"
        type="number"
        value={agariStoreData.agariData[props.playerIndex].han}
        readOnly
      />
      <button
        type="button"
        onClick={() => {
          if (agariStoreData.agariData[props.playerIndex].han <= 12) {
            agariStoreData.changeHan(props.playerIndex, 1);
          }
        }}
      >
        +
      </button>

      <div>
        <label>
          <input
            type="radio"
            name={`instantPoint${props.playerName}`}
            checked={Boolean(
              agariStoreData.agariData[props.playerIndex].instantMenu[
                instantMenuState.None
              ]
            )}
            onChange={(e) => {
              agariStoreData.changeInstantManu(
                props.playerIndex,
                instantMenuState.None,
                e.target.checked
              );
            }}
          />
          None
        </label>
        <label>
          <input
            type="radio"
            name={`instantPoint${props.playerName}`}
            checked={Boolean(
              agariStoreData.agariData[props.playerIndex].instantMenu[
                instantMenuState.Mangan
              ]
            )}
            onChange={(e) => {
              agariStoreData.changeInstantManu(
                props.playerIndex,
                instantMenuState.Mangan,
                e.target.checked
              );
            }}
          />
          Mangan
        </label>
        <label>
          <input
            type="radio"
            name={`instantPoint${props.playerName}`}
            checked={Boolean(
              agariStoreData.agariData[props.playerIndex].instantMenu[
                instantMenuState.Haneman
              ]
            )}
            onChange={(e) => {
              agariStoreData.changeInstantManu(
                props.playerIndex,
                instantMenuState.Haneman,
                e.target.checked
              );
            }}
          />
          Haneman
        </label>
        <label>
          <input
            type="radio"
            name={`instantPoint${props.playerName}`}
            checked={Boolean(
              agariStoreData.agariData[props.playerIndex].instantMenu[
                instantMenuState.Baiman
              ]
            )}
            onChange={(e) => {
              agariStoreData.changeInstantManu(
                props.playerIndex,
                instantMenuState.Baiman,
                e.target.checked
              );
            }}
          />
          Baiman
        </label>
        <label>
          <input
            type="radio"
            name={`instantPoint${props.playerName}`}
            checked={Boolean(
              agariStoreData.agariData[props.playerIndex].instantMenu[
                instantMenuState.Sanbaiman
              ]
            )}
            onChange={(e) => {
              agariStoreData.changeInstantManu(
                props.playerIndex,
                instantMenuState.Sanbaiman,
                e.target.checked
              );
            }}
          />
          3baiman
        </label>
        <label>
          <input
            type="radio"
            name={`instantPoint${props.playerName}`}
            checked={Boolean(
              agariStoreData.agariData[props.playerIndex].instantMenu[
                instantMenuState.Yakuman
              ]
            )}
            onChange={(e) => {
              agariStoreData.changeInstantManu(
                props.playerIndex,
                instantMenuState.Yakuman,
                e.target.checked
              );
            }}
          />
          Yakuman
        </label>
        {agariStoreData.agariData[props.playerIndex].instantMenu[
          instantMenuState.Yakuman
        ] && (
          <>
            <button
              type="button"
              onClick={() => {
                if (
                  Number(
                    agariStoreData.agariData[props.playerIndex].instantMenu[
                      instantMenuState.YakumanNum
                    ]
                  ) >= 2
                ) {
                  agariStoreData.changeInstantManu(
                    props.playerIndex,
                    instantMenuState.Yakuman,
                    true,
                    Number(
                      agariStoreData.agariData[props.playerIndex].instantMenu[
                        instantMenuState.YakumanNum
                      ]
                    ) - 1
                  );
                }
              }}
            >
              -
            </button>

            <input
              type="number"
              value={Number(
                agariStoreData.agariData[props.playerIndex].instantMenu[
                  instantMenuState.YakumanNum
                ]
              )}
              readOnly
            />
            <button
              type="button"
              onClick={() => {
                if (
                  Number(
                    agariStoreData.agariData[props.playerIndex].instantMenu[
                      instantMenuState.YakumanNum
                    ]
                  ) <= 8
                ) {
                  agariStoreData.changeInstantManu(
                    props.playerIndex,
                    instantMenuState.Yakuman,
                    true,
                    Number(
                      agariStoreData.agariData[props.playerIndex].instantMenu[
                        instantMenuState.YakumanNum
                      ]
                    ) + 1
                  );
                }
              }}
            >
              +
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PointForm;
