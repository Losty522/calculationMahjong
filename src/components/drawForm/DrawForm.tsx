"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PLAYER_INDEX, useFeildStatus, usePlayerStore } from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";

const DrawForm = () => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const fieldDataState = useGetFromStore(useFeildStatus, (state) => state);

  const submitDraw = async (formData: FormData) => {
    tenpaiCalculation();
    resetTenpai();
    redirect("/match");
  };

  const tenpaiCalculation = () => {
    const tenpaiPoint = 3000;
    let tenpaiPlayersNum = 0;
    playerDataState?.playerData.forEach((data) => {
      if (data.tenpai === true) {
        tenpaiPlayersNum++;
      }
    });
    const notenPlayers = 4 - tenpaiPlayersNum;

    //if tenpai players are from 1 to 3, coop with calulations
    if (tenpaiPlayersNum >= 1 && tenpaiPlayersNum <= 3) {
      playerDataState?.playerData.forEach((data) => {
        //if tempai, got points
        if (data.tenpai === true) {
          playerDataState?.calculatedPoints(
            data.id,
            +(tenpaiPoint / tenpaiPlayersNum)
          );
        } else {
          //pay point
          playerDataState?.calculatedPoints(
            data.id,
            -(tenpaiPoint / notenPlayers)
          );
        }
      });
    }

    //check if oyaPlayer is tenpai or not, if so continue round and add honba else go to next round
    if (
      playerDataState?.playerData[Number(fieldDataState?.oyaId)].tenpai === true
    ) {
      fieldDataState?.changeHonba(1);
    } else {
      fieldDataState?.changeHonba(-fieldDataState?.honba);
      fieldDataState?.changeNextOya();
      fieldDataState?.changeRound(1);
    }
    return;
  };

  const resetTenpai = () => {
    //if cancelled, all players tenpai will be false.
    playerDataState?.playerData.forEach((data, index) => {
      playerDataState.updateTenpai(index, false);
    });
  };

  return (
    <form
      action={submitDraw}
      className=" h-screen w-11/12 mx-auto flex flex-col items-center text-center bg-green-100"
    >
      <div className="text-center text-lg my-1 font-bold bg-green-400 w-11/12 rounded">
        Draw Form
      </div>

      <div className="flex flex-col my-1 bg-green-200 rounded w-11/12">
        <div className="font-bold">Tenpai players</div>
        {playerDataState?.playerData.map((data) => (
          <label key={data.id}>
            {playerDataState?.playerData[data.id].playerName}
            <input
              type="checkbox"
              checked={playerDataState?.playerData[data.id].tenpai}
              onChange={() => {
                playerDataState?.updateTenpai(
                  data.id,
                  !playerDataState?.playerData[data.id].tenpai
                );
              }}
            />
          </label>
        ))}
      </div>
      <br />

      <div className="flex justify-between  w-3/6 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 mb-1 rounded"
        >
          OK
        </button>
        <Link href="/match">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-1 mb-1 rounded"
            onClick={() => {
              resetTenpai();
            }}
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};

export default DrawForm;
