import { useGetFromStore } from "@/hooks/zustandHooks";
import { POSITION_INDEX, usePlayerStore } from "../playerStore";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  playerId: 0 | 1 | 2 | 3;
  users: { id: string; userName: string }[] | undefined;
};
const PositionButton = (props: Props) => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);

  const handlePositionButton = (playerId: number, positionIndex: number) => {
    const positonArray: number[] = [];
    const prePositionIndex =
      playerDataState?.playerData[playerId].startPositionFlag.indexOf(true); //get previous position index
    playerDataState?.updatePlayerStartPositionFlag(playerId, positionIndex);

    playerDataState?.playerData.forEach((data, index) => {
      if (playerId !== data.id) {
        //if not same player
        if (positionIndex === data.startPositionFlag.indexOf(true)) {
          //if previous players position index is same position which is goint to change
          playerDataState?.updatePlayerStartPositionFlag(
            index,
            Number(prePositionIndex)
          );
          positonArray.push(Number(prePositionIndex));
        } else {
          positonArray.push(data.startPositionFlag.indexOf(true));
        }
      } else {
        positonArray.push(positionIndex);
      }
    });

    playerDataState?.updateStartPosition(positonArray); //update startposition arr as well
  };

  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectUserId = e.target.value;
    const findUserData = props.users?.find(
      (userData) => userData.id === selectUserId
    );
    if (findUserData) {
      playerDataState?.updateNameAndUserId(
        props.playerId,
        findUserData?.userName,
        findUserData?.id
      );
    }
    return;
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="text-lg">{`P${props.playerId + 1}`}</div>
      <select
        onChange={handleUserChange}
        value={playerDataState?.playerData[props.playerId].userId}
      >
        <option value="">Select a user</option>
        {props.users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.userName}
          </option>
        ))}
      </select>
      <label htmlFor="" className="flex">
        <Image
          src={`/images/p_ji_e_1.gif`}
          alt={`east image`}
          className="h-7 w-5"
          width={20}
          height={28}
          onClick={() =>
            handlePositionButton(props.playerId, POSITION_INDEX.EAST)
          }
        />
        <input
          type="checkbox"
          checked={Boolean(
            playerDataState?.playerData[props.playerId].startPositionFlag[
              POSITION_INDEX.EAST
            ]
          )}
          onChange={() =>
            handlePositionButton(props.playerId, POSITION_INDEX.EAST)
          }
        />
      </label>
      <label htmlFor="" className="flex">
        <Image
          src={`/images/p_ji_s_1.gif`}
          alt={`SOUTH image`}
          className="h-7 w-5"
          width={20}
          height={28}
          onClick={() =>
            handlePositionButton(props.playerId, POSITION_INDEX.SOUTH)
          }
        />
        <input
          className="rounded"
          type="checkbox"
          checked={Boolean(
            playerDataState?.playerData[props.playerId].startPositionFlag[
              POSITION_INDEX.SOUTH
            ]
          )}
          onChange={() =>
            handlePositionButton(props.playerId, POSITION_INDEX.SOUTH)
          }
        />
      </label>
      <label htmlFor="" className="flex">
        <Image
          src={`/images/p_ji_w_1.gif`}
          alt={`WEST image`}
          className="h-7 w-5"
          width={20}
          height={28}
          onClick={() =>
            handlePositionButton(props.playerId, POSITION_INDEX.WEST)
          }
        />
        <input
          type="checkbox"
          checked={Boolean(
            playerDataState?.playerData[props.playerId].startPositionFlag[
              POSITION_INDEX.WEST
            ]
          )}
          onChange={() =>
            handlePositionButton(props.playerId, POSITION_INDEX.WEST)
          }
        />
      </label>
      <label htmlFor="" className="flex">
        <Image
          src={`/images/p_ji_n_1.gif`}
          alt={`NORTH image`}
          className="h-7 w-5"
          width={20}
          height={28}
          onClick={() =>
            handlePositionButton(props.playerId, POSITION_INDEX.NORTH)
          }
        />
        <input
          type="checkbox"
          checked={Boolean(
            playerDataState?.playerData[props.playerId].startPositionFlag[
              POSITION_INDEX.NORTH
            ]
          )}
          onChange={() =>
            handlePositionButton(props.playerId, POSITION_INDEX.NORTH)
          }
        />
      </label>
    </div>
  );
};

export default PositionButton;
