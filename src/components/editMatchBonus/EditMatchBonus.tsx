"use client";
import React, { useEffect, useState } from "react";
import { PLAYER_INDEX, usePlayerStore } from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import { redirect } from "next/navigation";
import Link from "next/link";

const EditMatchBonus = () => {
  const playerDataState = useGetFromStore(usePlayerStore, (state) => state);
  const [bonus, setBonus] = useState([0, 0, 0, 0]);
  const [placeBonus, setPlaceBonus] = useState([0, 0, 0, 0]);
  const [customPlaceBonus, setCustomPlaceBonus] = useState([5000, 10000]);
  const [customFlag, setCustomFlag] = useState(false);
  const [return3000Flag, setReturn3000Flag] = useState(false);

  enum PLACE_INDEX {
    CASE_NONE = 0,
    CASE05_10 = 1,
    CASE10_20 = 2,
    CASE10_30 = 3,
    CASE20_30 = 4,
    CASE_CUSTOM = 5,
  }

  const hangleReturnPoint = (flag: boolean) => {
    setBonus((prev) =>
      prev.map((val, index) =>
        flag
          ? val + (index === 0 ? 15000 : -5000)
          : val + (index === 0 ? -15000 : 5000)
      )
    );
  };

  const handlePlaceBonus = (index: number) => {
    const calculatePlaceBonus = (second: number, first: number) => {
      setPlaceBonus([first, second, -second, -first]);
    };

    if (index == PLACE_INDEX.CASE_NONE) {
      setPlaceBonus([0, 0, 0, 0]);
    } else if (index == PLACE_INDEX.CASE05_10) {
      calculatePlaceBonus(5000, 10000);
    } else if (index == PLACE_INDEX.CASE10_20) {
      calculatePlaceBonus(10000, 20000);
    } else if (index == PLACE_INDEX.CASE10_30) {
      calculatePlaceBonus(10000, 30000);
    } else if (index == PLACE_INDEX.CASE20_30) {
      calculatePlaceBonus(20000, 30000);
    } else if (index == PLACE_INDEX.CASE_CUSTOM && customFlag) {
      calculatePlaceBonus(customPlaceBonus[0], customPlaceBonus[1]);
    }
  };

  useEffect(() => {
    handlePlaceBonus(PLACE_INDEX.CASE_CUSTOM);
  }, [customPlaceBonus, customFlag]);

  const submitBonus = async (formData: FormData) => {
    playerDataState?.playerOrder.forEach((data, index) => {
      playerDataState.calculatedPoints(data, bonus[index] + placeBonus[index]);

      //update result point
      const totalPoint =
        playerDataState.playerData[data].point +
        bonus[index] +
        placeBonus[index];
      if (return3000Flag) {
        //in case of return 30000
        playerDataState.updateResultPoints(data, (totalPoint - 30000) / 1000);
      } else {
        playerDataState.updateResultPoints(data, (totalPoint - 25000) / 1000);
      }
    });

    //save mach result
    //yet

    redirect("/matchResult");
  };

  return (
    <form action={submitBonus}>
      {playerDataState?.playerOrder.map((data, index) => (
        <div key={data} className="flex">
          <div>
            {playerDataState?.playerData[data].playerName}{" "}
            {playerDataState?.playerData[data].point}
          </div>
          <div>
            {"--->"}
            {playerDataState?.playerData[data].point +
              bonus[index] +
              placeBonus[index]}
          </div>
        </div>
      ))}

      <label>
        {" "}
        Return 30000
        <input
          type="checkbox"
          checked={return3000Flag}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setReturn3000Flag(!return3000Flag);
            hangleReturnPoint(e.target.checked);
          }}
        />
      </label>

      <br />
      <label className="flex flex-col">
        <div>Place bonus</div>
        <div>
          <label>
            None
            <input
              type="radio"
              name="bonus"
              className="mr-2"
              defaultChecked={true}
              onChange={() => {
                setCustomFlag(false);
                handlePlaceBonus(PLACE_INDEX.CASE_NONE);
              }}
            />
          </label>
          <label>
            5-10
            <input
              type="radio"
              name="bonus"
              className="mr-2"
              onChange={() => {
                setCustomFlag(false);
                handlePlaceBonus(PLACE_INDEX.CASE05_10);
              }}
            />
          </label>
          <label>
            10-20
            <input
              type="radio"
              name="bonus"
              className="mr-2"
              onChange={() => {
                setCustomFlag(false);
                handlePlaceBonus(PLACE_INDEX.CASE10_20);
              }}
            />
          </label>
          <label>
            10-30
            <input
              type="radio"
              name="bonus"
              className="mr-2"
              onChange={() => {
                setCustomFlag(false);
                handlePlaceBonus(PLACE_INDEX.CASE10_30);
              }}
            />
          </label>
          <label>
            20-30
            <input
              type="radio"
              name="bonus"
              className="mr-2"
              onChange={() => {
                setCustomFlag(false);
                handlePlaceBonus(PLACE_INDEX.CASE20_30);
              }}
            />
          </label>
          <label>
            Custom
            <input
              type="radio"
              name="bonus"
              className="mr-2"
              checked={customFlag}
              onChange={() => {
                setCustomFlag(!customFlag);
                handlePlaceBonus(PLACE_INDEX.CASE_CUSTOM);
              }}
            />
          </label>
          <label>
            2st Place
            <button
              type="button"
              onClick={() => {
                if (customPlaceBonus[0] >= 2000) {
                  setCustomPlaceBonus((prev) => [prev[0] - 1000, prev[1]]);
                }
              }}
            >
              -
            </button>
            <input type="number" value={customPlaceBonus[0]} readOnly />
            <button
              type="button"
              onClick={() => {
                setCustomPlaceBonus((prev) => [prev[0] + 1000, prev[1]]);
              }}
            >
              +
            </button>
          </label>

          <label>
            1st Place
            <button
              type="button"
              onClick={() => {
                if (customPlaceBonus[0] >= 2000) {
                  setCustomPlaceBonus((prev) => [prev[0], prev[1] - 1000]);
                }
              }}
            >
              -
            </button>
            <input type="number" value={customPlaceBonus[1]} readOnly />
            <button
              type="button"
              onClick={() => {
                setCustomPlaceBonus((prev) => [prev[0], prev[1] + 1000]);
              }}
            >
              +
            </button>
          </label>
        </div>
      </label>

      <br />
      <button type="submit" className="border border-black">
        OK
      </button>
      <Link href="/match">
        <button
          type="button"
          className="border border-black"
          onClick={() => {}}
        >
          Cancel
        </button>
      </Link>
    </form>
  );
};

export default EditMatchBonus;
