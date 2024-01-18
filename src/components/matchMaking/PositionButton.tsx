import { useGetFromStore } from "@/hooks/zustandHooks";
import { POSITION_INDEX, usePlayerStore } from "../playerStore";
import { ChangeEvent, useEffect, useState } from "react";
import { getAllUsers } from "../../app/action/matchMaking/userDataFunction";
import Image from "next/image";

type Props = {
  playerId: 0 | 1 | 2 | 3;
};
const PositionButton = (props: Props) => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const [users, setUsers] = useState<{ id: string; userName: string }[]>();
  useEffect(() => {
    // get all users data
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers(); //get all users data from prisma
        await setUsers(allUsers); //set all users data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
    const findUserData = users?.find(
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
    <div className="flex items-center space-x-4 mb-2">
      <div className="text-lg">{`P${props.playerId + 1}`}</div>
      <select
        onChange={handleUserChange}
        value={playerDataState?.playerData[props.playerId].userId}
      >
        <option value="">Select a user</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.userName}
          </option>
        ))}
      </select>
      <label htmlFor="" className="flex">
        <Image
          src={`/images/p_ji_e_1.gif`}
          alt={`east image`}
          width={20}
          height={20}
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
          width={20}
          height={20}
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
          width={20}
          height={20}
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
          width={20}
          height={20}
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
