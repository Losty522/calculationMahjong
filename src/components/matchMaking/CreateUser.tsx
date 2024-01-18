"use clitent";
import React, { useState } from "react";
import { addUser } from "../../app/action/matchMaking/userDataFunction";
import FinishedMatch from "../FinishedMatch";
import { usePlayerStore } from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";

const CreateUser = () => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const [newUserName, setNewUserName] = useState("");
  const [message, setMessage] = useState(" ");
  const submitUser = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (newUserName === "") {
        setMessage("Error,name is empty");
        return;
      }
      await addUser(newUserName); //use server function,for saving user data by prisma
      setMessage("created new user successfully");
      setNewUserName("");
    } catch (error) {
      setMessage("Error,your name is already in use");
      console.log(error);
    }
    return;
  };
  //this match is already finished, go back to the home.
  if (playerDataState?.isMatchFinished) {
    return <FinishedMatch />;
  }

  return (
    <div className=" bg-white h-100px rounded-md shadow-md text-center">
      <div className="text-lg mt-2">Create a new user</div>
      <form
        onSubmit={submitUser}
        className="flex w-11/12 items-center mx-auto mb-1"
      >
        <input
          className="border rounded w-full py-1 px-3"
          name="username"
          type="text"
          value={newUserName}
          placeholder="User Name"
          onChange={(e) => {
            setNewUserName(e.target.value);
          }}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 ml-1 rounded"
        >
          Create
        </button>
      </form>
      <div className="text-red-700 ">{message}</div>
    </div>
  );
};

export default CreateUser;
