"use clitent";
import React, { useState } from "react";
import { addUser } from "../../app/action/matchMaking/userDataFunction";
import FinishedMatch from "../FinishedMatch";
import { usePlayerStore } from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";

const CreateUser = () => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState("");
  const submitUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      await addUser(newUserName); //use server function,for saving user data by prisma
      setMessage("created new user successfully");
      setNewUserName("");
    } catch (error) {
      setMessage("Error creating user,your name is already in use");
      console.log(error);
    }
    return;
  };
  //this match is already finished, go back to the home.
  if (playerDataState?.isMatchFinished) {
    return <FinishedMatch />;
  }

  return (
    <div>
      <div>CreateUser</div>
      <form onSubmit={submitUser}>
        <label htmlFor="">
          userName:
          <input
            name="username"
            type="text"
            value={newUserName}
            onChange={(e) => {
              setNewUserName(e.target.value);
            }}
          />
        </label>
        <button type="submit">Create</button>
      </form>
      <div className="text-red-700">{message}</div>
    </div>
  );
};

export default CreateUser;
