"use client";
import { redirect } from "next/navigation";
import {
  AGARI_WAY,
  PLAYER_INDEX,
  useAgariFormData,
  useFeildStatus,
  usePlayerStore,
} from "../playerStore";
import {
  ronKoPointTable,
  ronOyaPointTable,
  tsumoKoPointTable,
  tsumoOyaPointTable,
} from "./agariTable";

import { useEffect, useState } from "react";
import PointForm from "./PointForm";
import { useGetFromStore } from "@/hooks/zustandHooks";
import AgariWay from "./AgariWay";
import AgariPlayer from "./AgariPlayer";
import AgariFrom from "./AgariFrom";
import Link from "next/link";

const AgariForm = () => {
  const agariData = useAgariFormData();
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const fieldDataState = useGetFromStore(useFeildStatus, (state) => state);
  const [message, setMessage] = useState("");

  useEffect(() => {
    agariData.initializeData(); //initialize agaridata everytime
  }, []);

  const calculatePlayersPoint = () => {
    // who got the point, get agariPlayers index
    let agariPlayerIndex = agariData.agariPlayer
      .map((data, index) => (data ? index : -1))
      .filter((index) => index !== -1);

    let fromPlayerIndex: number[];
    // in case of tsumo
    if (agariPlayerIndex.length === 1 && agariData.agariWay[AGARI_WAY.TSUMO]) {
      fromPlayerIndex = [0, 1, 2, 3].filter(
        (index) => index !== agariPlayerIndex[0]
      );
    } else {
      fromPlayerIndex = agariData.agariFrom
        .map((data, index) => (data ? index : -1))
        .filter((index) => index !== -1);
    }
    //if agari or from player index is 0, return and show error message
    if (!agariPlayerIndex.length || !fromPlayerIndex.length) {
      setMessage("Please select both agari and Deal-in player");
      return false;
    }

    //agari players more than 2 players and honba is not 0, then arrange array
    if (
      agariPlayerIndex.length >= 2 &&
      fieldDataState != undefined &&
      fieldDataState?.honba > 0
    ) {
      //who is the next number
      const tempArray = [];
      let nextNumber: number;
      if (fromPlayerIndex[0] == 3) {
        nextNumber = 0;
      } else {
        nextNumber = fromPlayerIndex[0] + 1;
      }

      let counter = 0;
      while (counter < 4) {
        counter++;
        const findNumber = agariPlayerIndex.find((num) => num == nextNumber);
        if (findNumber != undefined) {
          tempArray.push(findNumber);
        }
        if (nextNumber == 3) {
          nextNumber = 0;
        } else {
          nextNumber++;
        }
      }
      agariPlayerIndex = [...tempArray]; //arranged  agari player array
    }

    //----------------------------------------------------------------
    // add agari point
    //----------------------------------------------------------------
    if (agariData.agariWay[AGARI_WAY.RON]) {
      agariPlayerIndex.forEach((data, index) => {
        // check if the player is ko or oya
        if (data === fieldDataState?.oyaId) {
          playerDataState?.calculatedPoints(
            data,
            +ronOyaPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] *
              (agariData.agariData[agariPlayerIndex[index]].han >= 13
                ? agariData.agariData[agariPlayerIndex[index]].yakumanNum
                : 1) + //if yakuman, multiply yakumanNum
              (index == 0 ? fieldDataState.honba * 300 : 0) + //add honba point *300. only first player can get this.
              (index == 0 ? fieldDataState.chips * 1000 : 0) //add chips *1000. only first player can get this.
          );
        } else {
          playerDataState?.calculatedPoints(
            data,
            +ronKoPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] *
              (agariData.agariData[agariPlayerIndex[index]].han >= 13
                ? agariData.agariData[agariPlayerIndex[index]].yakumanNum
                : 1) + //if yakuman, multiply yakumanNum
              (index == 0 && fieldDataState != undefined
                ? fieldDataState.honba * 300
                : 0) + //add honba point *300
              (index == 0 && fieldDataState != undefined
                ? fieldDataState.chips * 1000
                : 0) //add chips *1000. only first player can get this.
          );
        }
      });
    } else {
      // in case of tsumo
      agariPlayerIndex.forEach((data, index) => {
        if (data === fieldDataState?.oyaId) {
          playerDataState?.calculatedPoints(
            data,
            tsumoOyaPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] *
              3 *
              (agariData.agariData[data].han >= 13
                ? agariData.agariData[data].yakumanNum
                : 1) + //if yakuman, multiply yakumanNum // oya tsumo each 3 players so multiply by 3
              fieldDataState.honba * 300 + //add honba point *300
              fieldDataState.chips * 1000 //add chips *1000
          );
        } else {
          playerDataState?.calculatedPoints(
            data,
            (tsumoKoPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ][0] *
              2 +
              tsumoKoPointTable[agariData.agariData[data].fuIndex][
                agariData.agariData[data].han - 1
              ][1]) *
              (agariData.agariData[data].han >= 13
                ? agariData.agariData[data].yakumanNum
                : 1) + //if yakuman, multiply yakumanNum
              (fieldDataState != undefined ? fieldDataState.honba * 300 : 0) + //add honba point *300
              (fieldDataState != undefined ? fieldDataState.chips * 1000 : 0) //add honba point *300
          );
        }
      });
    }
    //----------------------------------------------------------------
    // reduce points from-players
    //----------------------------------------------------------------

    if (agariData.agariWay[AGARI_WAY.RON]) {
      // loop per agari players
      agariPlayerIndex.forEach((data, index) => {
        if (data === fieldDataState?.oyaId) {
          playerDataState?.calculatedPoints(
            fromPlayerIndex[0],
            -ronOyaPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] *
              (agariData.agariData[agariPlayerIndex[index]].han >= 13
                ? agariData.agariData[agariPlayerIndex[index]].yakumanNum
                : 1) - //if yakuman, multiply yakumanNum
              (index == 0 && fieldDataState != undefined
                ? fieldDataState.honba * 300
                : 0) //add honba point *300
          );
        } else {
          playerDataState?.calculatedPoints(
            fromPlayerIndex[0],
            -ronKoPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] *
              (agariData.agariData[agariPlayerIndex[index]].han >= 13
                ? agariData.agariData[agariPlayerIndex[index]].yakumanNum
                : 1) - //if yakuman, multiply yakumanNum
              (index == 0 && fieldDataState != undefined
                ? fieldDataState.honba * 300
                : 0) //add honba point *300
          );
        }
      });
    } else {
      // case of tsumo, agari player is only one, from-players are all others

      // agari player is oya, then others are all ko so use oya table
      if (agariPlayerIndex[0] === fieldDataState?.oyaId) {
        fromPlayerIndex.forEach((data) => {
          playerDataState?.calculatedPoints(
            data,
            -tsumoOyaPointTable[
              agariData.agariData[agariPlayerIndex[0]].fuIndex
            ][agariData.agariData[agariPlayerIndex[0]].han - 1] *
              (agariData.agariData[agariPlayerIndex[0]].han >= 13
                ? agariData.agariData[agariPlayerIndex[0]].yakumanNum
                : 1) - //if yakuman, multiply yakumanNum // oya tsumo each 3 players so multiply by 3
              (fieldDataState != undefined ? fieldDataState.honba * 100 : 0) //add honba point *100
          );
        });
      } else {
        // agari player is not oya so check who is oya.
        fromPlayerIndex.forEach((data) => {
          if (data === fieldDataState?.oyaId) {
            playerDataState?.calculatedPoints(
              data,
              -tsumoKoPointTable[
                agariData.agariData[agariPlayerIndex[0]].fuIndex
              ][agariData.agariData[agariPlayerIndex[0]].han - 1][1] *
                (agariData.agariData[agariPlayerIndex[0]].han >= 13
                  ? agariData.agariData[agariPlayerIndex[0]].yakumanNum
                  : 1) -
                (fieldDataState != undefined ? fieldDataState.honba * 100 : 0) //add honba point *100
            ); // according to oya point
          } else {
            playerDataState?.calculatedPoints(
              data,
              -tsumoKoPointTable[
                agariData.agariData[agariPlayerIndex[0]].fuIndex
              ][agariData.agariData[agariPlayerIndex[0]].han - 1][0] *
                (agariData.agariData[agariPlayerIndex[0]].han >= 13
                  ? agariData.agariData[agariPlayerIndex[0]].yakumanNum
                  : 1) -
                (fieldDataState != undefined ? fieldDataState.honba * 100 : 0) //add honba point *100
            ); // according to oya point
          }
        });
      }
    }

    //----------------------------------------------------------------
    // update feild status
    //----------------------------------------------------------------
    fieldDataState?.changeChips(-fieldDataState?.chips); //reset chips into 0
    playerDataState?.resetAllRiich(); //reset all riich status into false

    //check if oyaPlayer is win or not
    if (
      agariPlayerIndex.find((number) => number === fieldDataState?.oyaId) !==
      undefined
    ) {
      //oya player is win
      fieldDataState?.changeHonba(1); //add 1 into honba point
      //round is not changed.
    } else {
      //oya player is not win
      fieldDataState?.changeHonba(-fieldDataState?.honba); //reset honba into 0
      fieldDataState?.changeRound(1); //add 1 into round. move to next round
      let nextOyaID =
        Number(fieldDataState?.oyaId) + 1 >= 4
          ? 0
          : Number(fieldDataState?.oyaId) + 1;
      fieldDataState?.changeOyaId(nextOyaID);
    }

    return true;
  };

  const updateField = async (formData: FormData) => {
    const isCalculated = calculatePlayersPoint();
    if (!isCalculated) {
      return;
    }
    playerDataState?.updateRanking();
    redirect("/match");
  };

  if (playerDataState?.playerData[PLAYER_INDEX.PLAYER1].id == undefined) {
    return null;
  }

  return (
    <form
      action={updateField}
      className=" h-screen w-11/12 mx-auto flex flex-col items-center text-center bg-green-100"
    >
      <div className="text-center text-lg my-1 font-bold bg-green-400 w-11/12 rounded">
        Agari Form
      </div>

      <div className="my-1 bg-green-200 rounded w-11/12">
        <div className="my-1 font-bold">Agari Player(s)</div>
        <AgariPlayer
          playerData={playerDataState?.playerData[PLAYER_INDEX.PLAYER1]}
        />
        <AgariPlayer
          playerData={playerDataState?.playerData[PLAYER_INDEX.PLAYER2]}
        />
        <AgariPlayer
          playerData={playerDataState?.playerData[PLAYER_INDEX.PLAYER3]}
        />
        <AgariPlayer
          playerData={playerDataState?.playerData[PLAYER_INDEX.PLAYER4]}
        />
      </div>

      <div className="my-1 bg-green-200 rounded w-11/12">
        <div className="my-1 font-bold">Agari way</div>
        <AgariWay />
      </div>

      {agariData.agariPlayer[PLAYER_INDEX.PLAYER1] && (
        <PointForm
          playerIndex={Number(
            playerDataState?.playerData[PLAYER_INDEX.PLAYER1].id
          )}
          playerName={String(
            playerDataState?.playerData[PLAYER_INDEX.PLAYER1]?.playerName
          )}
        />
      )}

      {agariData.agariPlayer[PLAYER_INDEX.PLAYER2] && (
        <PointForm
          playerIndex={Number(
            playerDataState?.playerData[PLAYER_INDEX.PLAYER2].id
          )}
          playerName={String(
            playerDataState?.playerData[PLAYER_INDEX.PLAYER2]?.playerName
          )}
        />
      )}

      {agariData.agariPlayer[PLAYER_INDEX.PLAYER3] && (
        <PointForm
          playerIndex={Number(
            playerDataState?.playerData[PLAYER_INDEX.PLAYER3].id
          )}
          playerName={String(
            playerDataState?.playerData[PLAYER_INDEX.PLAYER3]?.playerName
          )}
        />
      )}

      {agariData.agariPlayer[PLAYER_INDEX.PLAYER4] && (
        <PointForm
          playerIndex={Number(
            playerDataState?.playerData[PLAYER_INDEX.PLAYER4].id
          )}
          playerName={String(
            playerDataState?.playerData[PLAYER_INDEX.PLAYER4]?.playerName
          )}
        />
      )}

      {!agariData.agariWay[AGARI_WAY.TSUMO] && (
        <div className="bg-green-200 w-11/12 my-2">
          <h2 className="text-center my-1 font-bold">Deal-in Player</h2>
          <AgariFrom
            playerData={playerDataState?.playerData[PLAYER_INDEX.PLAYER1]}
          />
          <AgariFrom
            playerData={playerDataState?.playerData[PLAYER_INDEX.PLAYER2]}
          />
          <AgariFrom
            playerData={playerDataState?.playerData[PLAYER_INDEX.PLAYER3]}
          />
          <AgariFrom
            playerData={playerDataState?.playerData[PLAYER_INDEX.PLAYER4]}
          />
        </div>
      )}

      <p className="text-red-600">{message}</p>
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

export default AgariForm;
