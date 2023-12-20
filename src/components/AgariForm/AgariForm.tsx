"use client";
import { redirect } from "next/navigation";
import { useAgariFormData, usePlayerStore } from "../playerStore";
import { ChangeEvent, useEffect, useState } from "react";
import PointForm from "./PointForm";
import { useGetFromStore } from "@/hooks/zustandHooks";
import { Unbounded } from "next/font/google";
import AgariWay from "./AgariWay";

const AgariForm = () => {
  const agariData = useAgariFormData();
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);

  useEffect(() => {
    agariData.initializeData(); //initialize agaridata everytime
  }, []);

  const updateField = async (formData: FormData) => {
    console.log("submit");

    console.log(formData.get("Fu")?.valueOf());
    console.log(agariData.agariPlayer);
    redirect("/match");
  };

  if (playerDataState?.player1?.id == undefined) {
    return null;
  }

  const handleAgariPlayer = async (
    e: ChangeEvent<HTMLInputElement>,
    playerIndex: number
  ) => {
    agariData.changeAgariPlayer(Number(playerIndex), e.target.checked);
    const trueCount = agariData.agariPlayer.filter(
      (value) => value === true
    ).length;

    if (trueCount > 0 && agariData.agariPlayer[playerIndex] == false) {
      agariData.changeAgariWay("RON");
    }

    return;
  };

  return (
    <form action={updateField}>
      <div>
        <label htmlFor="">Agari Player(s)</label>
        <label>
          <input
            type="checkbox"
            checked={
              agariData.agariPlayer[Number(playerDataState?.player1?.id)]
            }
            onChange={(e) => {
              handleAgariPlayer(e, Number(playerDataState?.player1?.id));
            }}
          />
          Player 1
        </label>
        <label>
          <input
            type="checkbox"
            checked={
              agariData.agariPlayer[Number(playerDataState?.player2?.id)]
            }
            onChange={(e) => {
              handleAgariPlayer(e, Number(playerDataState?.player2?.id));
            }}
          />
          Player 2
        </label>

        <label>
          <input
            type="checkbox"
            checked={
              agariData.agariPlayer[Number(playerDataState?.player3?.id)]
            }
            onChange={(e) => {
              handleAgariPlayer(e, Number(playerDataState?.player3?.id));
            }}
          />
          Player 3
        </label>

        <label>
          <input
            type="checkbox"
            checked={
              agariData.agariPlayer[Number(playerDataState?.player4?.id)]
            }
            onChange={(e) => {
              handleAgariPlayer(e, Number(playerDataState?.player4?.id));
            }}
          />
          Player 4
        </label>
      </div>

      <div>
        <AgariWay />
      </div>

      {agariData.agariPlayer[0] && (
        <PointForm
          playerIndex={Number(playerDataState?.player1.id)}
          playerName={String(playerDataState?.player1?.playerName)}
        />
      )}
      {agariData.agariPlayer[1] && (
        <PointForm
          playerIndex={Number(playerDataState?.player2.id)}
          playerName={String(playerDataState?.player2?.playerName)}
        />
      )}
      {agariData.agariPlayer[2] && (
        <PointForm
          playerIndex={Number(playerDataState?.player3.id)}
          playerName={String(playerDataState?.player3?.playerName)}
        />
      )}
      {agariData.agariPlayer[3] && (
        <PointForm
          playerIndex={Number(playerDataState?.player4.id)}
          playerName={String(playerDataState?.player4?.playerName)}
        />
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
