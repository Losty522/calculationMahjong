"use client"
import {create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface playerDataInterface {
  id:number,
  playerName: string,
  point: number,
}

export type playerStoreType = {
  playerData:playerDataInterface[];
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
export enum PLAYER_INDEX {
  PLAYER1=0,
  PLAYER2=1,
  PLAYER3=2,
  PLAYER4=3,
}

export enum AGARI_WAY {
  TSUMO=0,
  RON=1,
}

export type FeildStatusType = {
  round:number,
  honba:number,
  oyaId:number,
  agariMenue:boolean,
  changeNextOya:()=>void,
  changeRound:(number:number)=>void;
  changeHonba:(number:number)=>void;
}


export interface AgariData {
  fuIndex: number;
  han: number;
  instantMenu: (boolean | number)[];
}
export type agariFormDataType={
  agariPlayer:boolean[],
  agariWay:boolean[],//tsumo,ron
  agariFrom:boolean[],
  agariData: AgariData[];
  fuDisplay:number[];
  changeAgariWay:(wayText:("RON"|"TSUMO")) =>void;
  changeFu:(playerIndex:number,number:number)=>void,
  changeHan:(playerIndex:number,number:number)=>void
  changeAgariPlayer:(playerIndex:number,bool:boolean)=>void,
  changeAgariFrom:(playerIndex:number,bool:boolean)=>void,
  changeInstantManu:(playerIndex:number,index:number,bool:boolean,number?:number)=>void,
  initializeData:()=>void,
}
export const useAgariFormData = create<agariFormDataType>(
  (set)=>(
    {
      agariPlayer:[false,false,false,false],
      agariWay:[false,true],
      agariFrom:[false,false,false,false],
      fuDisplay:[20,25,30,40,50,60,70,80,90,100,110],
      agariData:[
        {
        fuIndex:2,
        han:1,
        instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
      },
      {
        fuIndex:2,
        han:1,
        instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
      },
      {
        fuIndex:2,
        han:1,
        instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
      },
      {
        fuIndex:2,
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
          ? { ...data, fuIndex: data.fuIndex + number }
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
      changeAgariFrom:(playerIndex:number,bool:boolean)=>set((state)=>{
        const tmpArray = [false,false,false,false]
        tmpArray[playerIndex] = bool
        return {agariFrom:tmpArray}
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
        agariWay:[false,true],
        agariFrom:[false,false,false,false],
        fuDisplay:[20,25,30,40,50,60,70,80,90,100,110],
          agariData:[
          {
          fuIndex:2,
          han:1,
          instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
        },
        {
          fuIndex:2,
          han:1,
          instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
        },
        {
          fuIndex:2,
          han:1,
          instantMenu:[true,false,false,false,false,false,1],//none,man,hane,bai,3bai,yaku,how many yakuman  
        },
        {
          fuIndex:2,
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
  oyaId:0,
  agariMenue:false,
  changeRound:(number:number)=>set((state)=>({round:state.round + number})),
  changeHonba:(number:number)=>set((state)=>({honba:state.honba + number})),
  changeAgariMenue:(bool:boolean)=>set((state)=>({agariMenue:bool})),
  changeNextOya:()=>set((state)=>{
    if(state.oyaId == 3){
      return {oyaId:0}
    }else{
   return {oyaId:state.oyaId+1}
  }
  }
    ),
}),{
  name: "FeildStatus",
  storage: createJSONStorage(() => localStorage),
}
)
)

export const usePlayerStore = create<playerStoreType>()(
  persist(
    (set) => ({
      playerData:[
        {
          id:0,
          playerName: "Player1",
          point: 25000,
        },
        {
          id:1,
          playerName: "Player2",
          point: 25000,
        },
  
        {
          id:2,
          playerName: "Player3",
          point: 25000,
        },
        {
          id:3,
          playerName: "Player4",
          point: 25000,
        },
        ]
      ,      
      calculatedPoints: (playerId: number, number: number) =>
      set((state) => ({
        playerData: state.playerData.map((data, dataIndex) =>
          dataIndex === playerId
            ? { ...data, point: data.point + number }
            : data
        ),
      })),
    })
    ,
    {
      name: "playerStoreData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);



export const ronKoPointTable = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //20 fu dammy table
  [
    0, 1600, 3200, 6400, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //25fu
  [
    1000, 2000, 3900, 7700, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //30fu
  [
    1300, 2600, 5200, 8000, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //40fu
  [
    1600, 3200, 6400, 8000, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //50fu
  [
    2000, 3900, 7700, 8000, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //60fu
  [
    2300, 4500, 8000, 8000, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //70fu
  [
    2600, 5200, 8000, 8000, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //80fu
  [
    2900, 5800, 8000, 8000, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //90fu
  [
    3200, 6400, 8000, 8000, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //100fu
  [
    3600, 7100, 8000, 8000, 8000, 12000, 12000, 16000, 16000, 16000, 24000,
    24000, 36000,
  ], //110fu
];

export const ronOyaPointTable = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //20 fu dammy table
  [
    0, 2400, 4800, 9600, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //25fu
  [
    1500, 2900, 5800, 11600, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //30fu
  [
    2000, 3900, 7700, 12000, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //40fu
  [
    2400, 4800, 9600, 12000, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //50fu
  [
    2900, 5800, 11600, 12000, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //60fu
  [
    3400, 6800, 12000, 12000, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //70fu
  [
    3900, 7700, 12000, 12000, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //80fu
  [
    4400, 8700, 12000, 12000, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //90fu
  [
    4800, 9600, 12000, 12000, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //100fu
  [
    5300, 10600, 12000, 12000, 12000, 18000, 18000, 24000, 24000, 24000, 36000,
    36000, 48000,
  ], //110fu
];


export const tsumoOyaPointTable = [
  [0, 700, 1300, 2600, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //20 fu dammy table
  [0, 800, 1600, 3200, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //25 fu dammy table
  [500, 1000, 2000, 3900, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //30 fu dammy table
  [700, 1300, 2600, 4000, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //40 fu dammy table
  [800, 1600, 3200, 4000, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //50 fu dammy table
  [1000, 2000, 3900, 4000, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //60 fu dammy table
  [1200, 2300, 4000, 4000, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //70 fu dammy table
  [1300, 2600, 4000, 4000, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //80 fu dammy table
  [1500, 2900, 4000, 4000, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //90 fu dammy table
  [1600, 3200, 4000, 4000, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //100 fu dammy table
  [1800, 3600, 4000, 4000, 4000, 6000, 6000, 8000, 8000, 8000, 12000, 12000, 16000], //110 fu dammy table
];


export const tsumoKoPointTable = [
  [
    [0, 0],
    [400, 700],
    [700, 1300],
    [1300, 2600],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //20 fu tsumo
  [
    [0, 0],
    [400, 800],
    [800, 1600],
    [1600, 3200],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //25 fu tsumo
  [
    [300, 500],
    [500, 1000],
    [1000, 2000],
    [2000, 3900],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //30 fu tsumo
  [
    [400, 700],
    [700, 1300],
    [1300, 2600],
    [2000, 4000],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //40 fu tsumo
  [
    [400, 800],
    [800, 1600],
    [1600, 3200],
    [2000, 4000],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //50 fu tsumo
  [
    [500, 1000],
    [1000, 2000],
    [2000, 3900],
    [2000, 4000],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //60 fu tsumo
  [
    [600, 1200],
    [1200, 2300],
    [2000, 4000],
    [2000, 4000],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //70 fu tsumo
  [
    [700, 1300],
    [1300, 2600],
    [2000, 4000],
    [2000, 4000],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //80 fu tsumo
  [
    [800, 1500],
    [1500, 2900],
    [2000, 4000],
    [2000, 4000],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //90 fu tsumo
  [
    [800, 1600],
    [1600, 3200],
    [2000, 4000],
    [2000, 4000],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //100 fu tsumo
  [
    [900, 1800],
    [1800, 3600],
    [2000, 4000],
    [2000, 4000],
    [2000, 4000],
    [3000, 6000],
    [3000, 6000],
    [4000, 8000],
    [4000, 8000],
    [4000, 8000],
    [6000, 12000],
    [6000, 12000],
    [8000, 16000],
  ], //110 fu tsumo
];
