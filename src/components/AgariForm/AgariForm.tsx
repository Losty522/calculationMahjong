"use client";
import { redirect } from "next/navigation";
import {
  AGARI_WAY,
  PLAYER_INDEX,
  ronKoPointTable,
  ronOyaPointTable,
  tsumoKoPointTable,
  tsumoOyaPointTable,
  useAgariFormData,
  useFeildStatus,
  usePlayerStore,
} from "../playerStore";
import { useEffect } from "react";
import PointForm from "./PointForm";
import { useGetFromStore } from "@/hooks/zustandHooks";
import AgariWay from "./AgariWay";
import AgariPlayer from "./AgariPlayer";
import AgariFrom from "./AgariFrom";

const AgariForm = () => {
  const agariData = useAgariFormData();
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const fieldDataState = useGetFromStore(useFeildStatus, (state) => state);

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
      agariPlayerIndex = [...tempArray];
    }

    // add agari point
    if (agariData.agariWay[AGARI_WAY.RON]) {
      agariPlayerIndex.forEach((data, index) => {
        // check if the player is ko or oya
        if (data === fieldDataState?.oyaId) {
          playerDataState?.calculatedPoints(
            data,
            +ronOyaPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] + (index == 0 ? fieldDataState.honba * 300 : 0) //add honba point *300
          );
        } else {
          playerDataState?.calculatedPoints(
            data,
            +ronKoPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] +
              (index == 0 && fieldDataState != undefined
                ? fieldDataState.honba * 300
                : 0) //add honba point *300
          );
        }
      });
    } else {
      // in case of tsumo

      agariPlayerIndex.forEach((data) => {
        if (data === fieldDataState?.oyaId) {
          playerDataState?.calculatedPoints(
            data,
            tsumoOyaPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] *
              3 + // oya tsumo each 3 players so multiply by 3
              fieldDataState.honba * 300 //add honba point *300
          );
        } else {
          playerDataState?.calculatedPoints(
            data,
            tsumoKoPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ][0] *
              2 +
              tsumoKoPointTable[agariData.agariData[data].fuIndex][
                agariData.agariData[data].han - 1
              ][1] +
              (fieldDataState != undefined ? fieldDataState.honba * 300 : 0) //add honba point *300
          );
        }
      });
    }

    // reduce points from-players
    if (agariData.agariWay[AGARI_WAY.RON]) {
      // loop per agari players
      agariPlayerIndex.forEach((data, index) => {
        if (data === fieldDataState?.oyaId) {
          playerDataState?.calculatedPoints(
            fromPlayerIndex[0],
            -ronOyaPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] -
              (index == 0 && fieldDataState != undefined
                ? fieldDataState.honba * 300
                : 0) //add honba point *300
          );
        } else {
          playerDataState?.calculatedPoints(
            fromPlayerIndex[0],
            -ronKoPointTable[agariData.agariData[data].fuIndex][
              agariData.agariData[data].han - 1
            ] -
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
            ][agariData.agariData[agariPlayerIndex[0]].han - 1] - // oya tsumo each 3 players so multiply by 3
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
              ][agariData.agariData[agariPlayerIndex[0]].han - 1][1] -
                (fieldDataState != undefined ? fieldDataState.honba * 100 : 0) //add honba point *100
            ); // according to oya point
          } else {
            playerDataState?.calculatedPoints(
              data,
              -tsumoKoPointTable[
                agariData.agariData[agariPlayerIndex[0]].fuIndex
              ][agariData.agariData[agariPlayerIndex[0]].han - 1][0] -
                (fieldDataState != undefined ? fieldDataState.honba * 100 : 0) //add honba point *100
            ); // according to oya point
          }
        });
      }
    }

    // fieldDataState?.changeNextOya();
    console.log(agariPlayerIndex);
    console.log(fromPlayerIndex);
  };

  const updateField = async (formData: FormData) => {
    console.log("submit");
    calculatePlayersPoint();
    // console.log(formData.get("Fu")?.valueOf());
    // console.log(agariData.agariPlayer);
    redirect("/match");
  };

  if (playerDataState?.playerData[PLAYER_INDEX.PLAYER1].id == undefined) {
    return null;
  }

  return (
    <form action={updateField}>
      <div>
        <label htmlFor="">Agari Player(s)</label>
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

      <div>
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
        <div>
          <h2>Agari from who</h2>
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

      <br />
      <br />
      <br />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};

export default AgariForm;
