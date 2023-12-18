"use client"
import {create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type playerStoreType = {
  player1:{
    id:number,
    playerName: string,
    point: number,
    
  },
  player2:{
    id:number,
    playerName: string,
    point: number,
    
  },
  player3:{
    id:number,
    playerName: string,
    point: number,
    
  },
  player4:{
    id:number,
    playerName: string,
    point: number,
    
  },
  calculatedPoints:(playerId:number,number:number) => void;
}


export type FeildStatusType = {
  round:number,
  honba:number,
  changeRound:(number:number)=>void;
  changeHonba:(number:number)=>void;
}

export const useFeildStatus = create<FeildStatusType>()(
persist(
  (set)=>({
  round:0,
  honba:0,
  changeRound:(number:number)=>set((state)=>({round:state.round + number})),
  changeHonba:(number:number)=>set((state)=>({honba:state.honba + number})),
}),{
  name: "FeildStatus",
  storage: createJSONStorage(() => localStorage),
}
)
)

export const usePlayerStore = create<playerStoreType>()(
  persist(
    (set) => ({
      player1:{
        id:1,
        playerName: "Player1",
        point: 25000,
      },
      player2:{
        id:2,
        playerName: "Player2",
        point: 25000,
      },

      player3:{
        id:3,
        playerName: "Player3",
        point: 25000,
      },
      player4:{
        id:4,
        playerName: "Player4",
        point: 25000,
      },
      
      calculatedPoints: (playerId: number, number: number) =>
      set((state) => {
        const player = state[`player${playerId}`as keyof playerStoreType];
        if ('point' in player) {
          return {
            [`player${playerId}`]: {
              ...player,
              point: player.point + number,
            },
          };
        }
        return state;
      }),
    })
    ,
    {
      name: "playerStoreData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

