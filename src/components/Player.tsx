"use client";
type PlayerType = {
  id: number;
  playerName: string;
  point: number;
  calculatedPoints: (id: number, number: number) => void;
};

const Player = (props: PlayerType) => {
  return (
    <div className="border border-black mt-3 w-3/6 text-center">
      <div>Player Name: {props.playerName}</div>
      <div>point:{props?.point}</div>
      <button onClick={() => props?.calculatedPoints(props.id, -200)}>
        cul
      </button>
    </div>
  );
};

export default Player;
