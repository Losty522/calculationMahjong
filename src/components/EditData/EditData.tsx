"use client";
import { useGetFromStore } from "@/hooks/zustandHooks";
import { useFeildStatus, usePlayerStore } from "../playerStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { redirect } from "next/navigation";

const EditData = () => {
  const feildStatus = useGetFromStore(useFeildStatus, (state) => state);
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const [editPoint, setEditPoint] = useState([25000, 25000, 25000, 25000]);
  const [editRound, setEditRound] = useState(0);
  const [editHonba, setEditHonba] = useState(0);
  const [editChip, setEditChip] = useState(0);
  const [editOyaId, setEditOyaId] = useState(0);

  const updateEditData = () => {
    playerDataState?.startPositonId.forEach((data) => {
      playerDataState?.calculatedPoints(
        data,
        -playerDataState.playerData[data].point + editPoint[data]
      );
      playerDataState?.changeRiici(data, false);
    });
    feildStatus?.changeRound(-feildStatus.round + editRound);
    feildStatus?.changeHonba(-feildStatus.honba + editHonba);
    feildStatus?.changeChips(-feildStatus.chips + editChip);
    feildStatus?.changeOyaId(editOyaId);

    redirect("/match");
  };

  const getPresentData = () => {
    setEditPoint([
      Number(
        playerDataState?.playerData[playerDataState.startPositonId[0]].point
      ),
      Number(
        playerDataState?.playerData[playerDataState.startPositonId[1]].point
      ),
      Number(
        playerDataState?.playerData[playerDataState.startPositonId[2]].point
      ),
      Number(
        playerDataState?.playerData[playerDataState.startPositonId[3]].point
      ),
    ]);
    setEditRound(Number(feildStatus?.round));
    setEditHonba(Number(feildStatus?.honba));
    setEditChip(Number(feildStatus?.chips));
    setEditOyaId(Number(feildStatus?.oyaId));
  };

  return (
    <form
      action={updateEditData}
      className=" h-screen w-11/12 mx-auto flex flex-col items-center text-center bg-green-100"
    >
      <div className="text-center text-lg my-1 font-bold bg-green-400 w-11/12 rounded">
        Edit Data Form
      </div>
      <button
        type="button"
        className="bg-slate-500 hover:bg-slate-700 text-white py-1 px-1 mb-1 rounded"
        onClick={() => {
          getPresentData();
        }}
      >
        Get Present Data
      </button>
      <div className="flex flex-col my-1 bg-green-200 rounded w-11/12">
        <div className="font-bold">Name - Present Point - Edit Point</div>
        {playerDataState?.startPositonId.map((data) => (
          <div
            key={playerDataState?.playerData[data].id}
            className="flex my-2 justify-center"
          >
            <div className="mr-2">
              {playerDataState?.playerData[data].playerName}
            </div>
            <div className="mr-3">
              {playerDataState?.playerData[data].point}
            </div>
            <input
              className="text-center"
              type="number"
              value={editPoint[data]}
              min={-1000000}
              max={1000000}
              step={100}
              onChange={(e) => {
                const newValue = e.target.value;
                setEditPoint((prev) => {
                  const newArray = [...prev];
                  newArray[data] = Number(newValue);
                  return newArray;
                });
              }}
            />
          </div>
        ))}

        <div className="flex justify-center my-3">
          <div>Round:</div>
          <div>{feildStatus?.displayRound[feildStatus?.round]}</div>
          <button
            type="button"
            className="mx-2"
            onClick={() => {
              setEditRound((prev) => {
                if (prev === 0) {
                  return 0;
                } else {
                  return prev - 1;
                }
              });
            }}
          >
            <FaMinus />
          </button>
          <input className="hidden" type="number" value={editRound} readOnly />
          <div>{feildStatus?.displayRound[editRound]}</div>
          <button
            type="button"
            className="mx-2"
            onClick={() => {
              setEditRound((prev) => {
                if (prev === 15) {
                  return 15;
                } else {
                  return prev + 1;
                }
              });
            }}
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex justify-center my-3">
          <div className="mr-2">
            <Image
              className="h-full w-full"
              src={`/images/honba.png`}
              alt={`east image`}
              width={10}
              height={10}
            />
          </div>
          <div>{feildStatus?.honba}</div>
          <button
            type="button"
            className="mx-2"
            onClick={() => {
              setEditHonba((prev) => {
                if (prev === 0) {
                  return 0;
                } else {
                  return prev - 1;
                }
              });
            }}
          >
            <FaMinus />
          </button>
          <input
            type="number"
            className="text-center"
            value={editHonba}
            max={99}
            min={0}
            readOnly
          />

          <button
            type="button"
            className="mx-2"
            onClick={() => {
              setEditHonba((prev) => {
                if (prev === 99) {
                  return 99;
                } else {
                  return prev + 1;
                }
              });
            }}
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex justify-center my-3">
          <div className="mr-2">
            <Image
              className="h-full w-full"
              src={`/images/chips.png`}
              alt={`east image`}
              width={10}
              height={10}
            />
          </div>
          <div>{feildStatus?.chips}</div>
          <button
            type="button"
            className="mx-2"
            onClick={() => {
              setEditChip((prev) => {
                if (prev === 0) {
                  return 0;
                } else {
                  return prev - 1;
                }
              });
            }}
          >
            <FaMinus />
          </button>
          <input
            type="number"
            className="text-center"
            value={editChip}
            max={99}
            min={0}
            readOnly
          />

          <button
            type="button"
            className="mx-2"
            onClick={() => {
              setEditChip((prev) => {
                if (prev === 99) {
                  return 99;
                } else {
                  return prev + 1;
                }
              });
            }}
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex justify-center">
          <div>Oya:</div>
          <div>
            {
              playerDataState?.playerData[
                playerDataState?.startPositonId[Number(feildStatus?.oyaId)]
              ].playerName
            }
          </div>
          <button
            type="button"
            className="mx-2"
            onClick={() => {
              setEditOyaId((prev) => {
                if (prev === 0) {
                  return 0;
                } else {
                  return prev - 1;
                }
              });
            }}
          >
            <FaMinus />
          </button>
          <input className="hidden" type="number" value={editRound} readOnly />
          <div className="w-28">
            {
              playerDataState?.playerData[
                playerDataState?.startPositonId[editOyaId]
              ].playerName
            }
          </div>
          <button
            type="button"
            className="mx-2"
            onClick={() => {
              setEditOyaId((prev) => {
                if (prev === 3) {
                  return 3;
                } else {
                  return prev + 1;
                }
              });
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="flex justify-between  w-3/6 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 mb-1 rounded"
        >
          OK
        </button>

        <Link
          href="/match"
          className="bg-red-500 hover:bg-red-700 text-white py-1 px-1 mb-1 rounded"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default EditData;
