"use client";
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "../playerStore";
import { useGetFromStore } from "@/hooks/zustandHooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addMatchResult } from "@/app/action/matchResult/matchDataFunction";
import FinishedMatch from "../FinishedMatch";
import {
  FaArrowRight,
  FaMedal,
  FaMinus,
  FaPlus,
  FaTrophy,
} from "react-icons/fa";
import { PiBirdFill } from "react-icons/pi";

export type resultObjType = {
  timestamp: number;
  returnFlag: boolean;
  placeBonus: number[];
  customBonus: number[];
  PlayerData: {
    point: number;
    resultPoint: number;
    userId: string;
    userName: string;
  }[];
};

const EditMatchBonus = () => {
  const router = useRouter();
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

  const submitBonus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const timestamp = Math.floor(new Date().getTime() / 1000);
    const sendObject: resultObjType = {
      timestamp: timestamp,
      returnFlag: return3000Flag,
      placeBonus: placeBonus,
      customBonus: customPlaceBonus,
      PlayerData: [
        {
          point: 0,
          resultPoint: 0,
          userId: "",
          userName: "",
        },
        {
          point: 0,
          resultPoint: 0,
          userId: "",
          userName: "",
        },

        {
          point: 0,
          resultPoint: 0,
          userId: "",
          userName: "",
        },
        {
          point: 0,
          resultPoint: 0,
          userId: "",
          userName: "",
        },
      ],
    };
    playerDataState?.playerOrder.forEach((data, index) => {
      const totalBonusPoint = bonus[index] + placeBonus[index]; //bonus + placeBounus point
      playerDataState.calculatedPoints(data, totalBonusPoint); //add bonus point

      //update result point
      const totalPoint =
        playerDataState.playerData[data].point +
        bonus[index] +
        placeBonus[index];
      let resultPoint; //convert from total point into result point :in case of return 30000, 35000 -> 5pt

      resultPoint = (totalPoint - 25000) / 1000; //reduce initial point

      playerDataState.updateResultPoints(data, resultPoint);
      //save result data into tempData for saving database later
      sendObject.PlayerData[index].point = totalPoint;
      sendObject.PlayerData[index].resultPoint = resultPoint;
      sendObject.PlayerData[index].userId =
        playerDataState.playerData[data].userId;
      sendObject.PlayerData[index].userName =
        playerDataState.playerData[data].playerName;
    });

    await addMatchResult(sendObject);
    router.push("/matchResult");
  };

  //this match is already finished, go back to the home.
  if (playerDataState?.isMatchFinished) {
    return <FinishedMatch />;
  }

  return (
    <form
      onSubmit={submitBonus}
      className=" h-screen w-11/12 mx-auto flex flex-col items-center bg-green-100 text-center"
    >
      <div className="text-center text-lg my-1 font-bold bg-green-400 w-11/12 rounded">
        Bonus Edit Form
      </div>
      <div className="my-1 bg-green-200 rounded w-11/12 ">
        <div className="font-bold flex justify-center">
          Result (Before <FaArrowRight className="mt-1 mx-1" /> After)
        </div>

        {playerDataState?.playerOrder.map((data, index) => (
          <div key={data} className="flex my-1 justify-center">
            {index === 0 ? (
              <div className="flex">
                <FaTrophy className="text-yellow-500" />
                <p className="mr-1">1st</p>
              </div>
            ) : index === 1 ? (
              <div className="flex">
                <FaTrophy className="text-slate-500" />
                <p className="mr-1">2nd</p>
              </div>
            ) : index === 2 ? (
              <div className="flex">
                <FaTrophy className="text-amber-600" />
                <p className="mr-1">3rd</p>
              </div>
            ) : (
              <div className="flex">
                <PiBirdFill className="text-yellow-600" />
                <p className="mr-1">4th</p>
              </div>
            )}
            <div className="flex">
              <p className="mx-3">
                {playerDataState?.playerData[data].playerName}{" "}
              </p>
              {playerDataState?.playerData[data].point}
            </div>
            <FaArrowRight className="mt-1 mx-1" />
            <div>
              {playerDataState?.playerData[data].point +
                bonus[index] +
                placeBonus[index]}
            </div>
          </div>
        ))}
      </div>
      <label className="my-1 bg-green-200 rounded w-11/12">
        <div className="font-bold">Return points (default:25000)</div>
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

      <label className="my-1 bg-green-200 rounded w-11/12">
        <div className="font-bold">Place bonus</div>
        <div className="flex flex-col">
          <label className="my-1">
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
          <label className="my-1">
            5000-10000
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
          <label className="my-1">
            10000-20000
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
          <label className="my-1">
            10000-30000
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
          <label className="my-1">
            20000-30000
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
          <label className="my-1">
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
          <label className="my-1">
            2nd Place Bonus
            <button
              type="button"
              onClick={() => {
                if (customPlaceBonus[0] >= 2000) {
                  setCustomPlaceBonus((prev) => [prev[0] - 1000, prev[1]]);
                }
              }}
            >
              <FaMinus className="mx-1" />
            </button>
            <input
              type="number"
              className="text-center"
              value={customPlaceBonus[0]}
              step={1000}
              min={1000}
              max={100000}
              readOnly
            />
            <button
              type="button"
              onClick={() => {
                setCustomPlaceBonus((prev) => [prev[0] + 1000, prev[1]]);
              }}
            >
              <FaPlus className="mx-1" />
            </button>
          </label>

          <label className="my-1">
            1st Place Bonus
            <button
              type="button"
              onClick={() => {
                if (customPlaceBonus[0] >= 2000) {
                  setCustomPlaceBonus((prev) => [prev[0], prev[1] - 1000]);
                }
              }}
            >
              <FaMinus className="mx-1" />
            </button>
            <input
              className="text-center"
              type="number"
              value={customPlaceBonus[1]}
              step={1000}
              min={1000}
              max={100000}
              readOnly
            />
            <button
              type="button"
              onClick={() => {
                setCustomPlaceBonus((prev) => [prev[0], prev[1] + 1000]);
              }}
            >
              <FaPlus className="mx-1" />
            </button>
          </label>
        </div>
      </label>

      <div className="flex justify-between  w-3/6 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-1 mb-1 rounded"
        >
          OK
        </button>
        <Link href="/match">
          <button
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white py-1 px-1 mb-1 rounded"
            onClick={() => {}}
          >
            Cancel
          </button>
        </Link>
      </div>
    </form>
  );
};

export default EditMatchBonus;
