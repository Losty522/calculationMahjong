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

export enum instantMenuState {
  None=0,
  Mangan=1,
  Haneman=2,
  Baiman=3,
  Sanbaiman=4,
  Yakuman=5,
  YakumanNum=6,
}

export type FeildStatusType = {
  round:number,
  honba:number,
  agariMenue:boolean,
  changeRound:(number:number)=>void;
  changeHonba:(number:number)=>void;
}


export interface AgariData {
  fu: number;
  han: number;
  instantMenu: (boolean | number)[];
}
export type agariFormDataType={
  agariPlayer:boolean[],
  agariWay:boolean[],//tsumo,ron
  agariData: AgariData[];
  changeAgariWay:(wayText:("RON"|"TSUMO")) =>void;
  changeFu:(playerIndex:number,number:number)=>void,
  changeHan:(playerIndex:number,number:number)=>void
  changeAgariPlayer:(playerIndex:number,bool:boolean)=>void,
  changeInstantManu:(playerIndex:number,index:number,bool:boolean,number?:number)=>void,
  initializeData:()=>void,
}
export const useAgariFormData = create<agariFormDataType>(
  (set)=>(
    {
      agariPlayer:[false,false,false,false],
      agariWay:[false,false],
      agariData:[
        {
        fu:30,
        han:1,
        instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
      },
      {
        fu:30,
        han:1,
        instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
      },
      {
        fu:30,
        han:1,
        instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
      },
      {
        fu:30,
        han:1,
        instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
      },    
    ],
    changeAgariWay:(wayText:("RON"|"TSUMO"))=>set(()=>{
      if(wayText=="TSUMO"){
        return { agariWay:[true,false]}
      }else{
        return { agariWay:[false,true]}
      }
    }),
    changeFu: (playerIndex: number, number: number) =>
    set((state) => ({
      agariData: state.agariData.map((data, dataIndex) =>
        dataIndex === playerIndex
          ? { ...data, fu: data.fu + number }
          : data
      ),
    })),
      changeHan: (playerIndex: number, number: number) =>
      set((state) => ({
        agariData: state.agariData.map((data, dataIndex) =>
          dataIndex === playerIndex
            ? { ...data, han: data.han + number }
            : data
        ),
      })),
  
      changeAgariPlayer:(playerIndex:number,bool:boolean)=>set((state)=>{

        const trueCount = state.agariPlayer.filter((value) => value === true).length;
        if(state.agariPlayer[playerIndex]==false && trueCount>=3){
          return{};//if already checked other 3 players ,return empty object for not doing anything
        }

        const tmpArray = [...state.agariPlayer]
        tmpArray[playerIndex] = bool
        return {agariPlayer:tmpArray}
      }),
      changeInstantManu: (playerIndex: number, index: number, bool: boolean, number?: number) =>
      set((state) => ({
        agariData: state.agariData.map((data, dataIndex) => {
          if (dataIndex === playerIndex) {
            const tmpArray = [false, false, false, false, false, false, 1];
    
            if (index >= 0 && index <= 4) {
              tmpArray[index] = bool;
            } else if (number !== undefined && index === 5) {
              tmpArray[index] = bool;
              tmpArray[index + 1] = number;
            } else if (index === 5) {
              tmpArray[index] = bool;
              tmpArray[6] = 1;
            } else {
              return data;
            }
            return { ...data, instantMenu: tmpArray };
          } else {
            return data;
          }
        }),
      })),
    
      initializeData:()=>set({
        agariPlayer:[false,false,false,false],
        agariData:[
          {
          fu:30,
          han:1,
          instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
        },
        {
          fu:30,
          han:1,
          instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
        },
        {
          fu:30,
          han:1,
          instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
        },
        {
          fu:30,
          han:1,
          instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
        },    
      ],
  
      })
    }
    ))

export const useFeildStatus = create<FeildStatusType>()(
persist(
  (set)=>({
  round:0,
  honba:0,
  agariMenue:false,
  changeRound:(number:number)=>set((state)=>({round:state.round + number})),
  changeHonba:(number:number)=>set((state)=>({honba:state.honba + number})),
  changeAgariMenue:(bool:boolean)=>set((state)=>({agariMenue:bool})),
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
        id:0,
        playerName: "Player1",
        point: 25000,
      },
      player2:{
        id:1,
        playerName: "Player2",
        point: 25000,
      },

      player3:{
        id:2,
        playerName: "Player3",
        point: 25000,
      },
      player4:{
        id:3,
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

