import { useGetFromStore } from "@/hooks/zustandHooks";
import { POSITION_INDEX, usePlayerStore } from "../playerStore";

type Props = {
  playerId: 0 | 1 | 2 | 3;
};
const PositionButton = (props: Props) => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);

  const handlePositionButton = (playerId: number, positionIndex: number) => {
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
        }
      }
    });
  };

  return (
    <div>
      <label htmlFor="">
        Name: {playerDataState?.playerData[props.playerId].playerName}
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
        E
      </label>
      <label htmlFor="">
        <input
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
        S
      </label>
      <label htmlFor="">
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
        W
      </label>

      <label htmlFor="">
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
        N
      </label>
    </div>
  );
};

export default PositionButton;
