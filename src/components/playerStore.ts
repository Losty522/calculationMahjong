"use client"
import {create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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


export interface AgariData {
  fuIndex: number;
  han: number;
  yakumanNum: number;
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
  changeYakumanNum:(playerIndex:number,number:number)=>void
  changeAgariPlayer:(playerIndex:number,bool:boolean)=>void,
  changeAgariFrom:(playerIndex:number,bool:boolean)=>void,
  initializeData:()=>void,
}

const initialAgariFormData = {
  agariPlayer:[false,false,false,false],
  agariWay:[false,true],
  agariFrom:[false,false,false,false],
  fuDisplay:[20,25,30,40,50,60,70,80,90,100,110],
  agariData:[
    {
    fuIndex:2,
    han:1,
    yakumanNum:1,
    
  },
  {
    fuIndex:2,
    han:1,
    yakumanNum:1,
    
  },
  {
    fuIndex:2,
    han:1,
    yakumanNum:1,
    
  },
  {
    fuIndex:2,
    han:1,
    yakumanNum:1
  },    
]
}

export const useAgariFormData = create<agariFormDataType>(
  (set)=>(
    {
      ...initialAgariFormData,
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
      changeYakumanNum: (playerIndex: number, number: number) =>
      set((state) => ({
        agariData: state.agariData.map((data, dataIndex) =>
          dataIndex === playerIndex
            ? { ...data, yakumanNum: data.yakumanNum + number }
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

      initializeData:()=>set({...initialAgariFormData}),
    }
    ))


export type FeildStatusType = {
  round:number,
  displayRound:string[],
  honba:number,
  chips:number,
  oyaId:number,
  agariMenue:boolean,
  initializeData:()=>void,
  changeNextOya:()=>void,
  changeRound:(number:number)=>void;
  changeHonba:(number:number)=>void;
  changeChips:(number:number)=>void;
  changeOyaId:(number:number)=>void;
}
    

const initialFeildStatus = {
  round:0,
  displayRound:["East 1", "East 2", "East 3", "East 4", "South 1", "South 2", "South 3", "South 4", "West 1", "West 2", "West 3", "West 4", "North 1", "North 2", "North 3", "North 4"],
  honba:0,
  chips:0,
  oyaId:0,
  agariMenue:false,
}

export const useFeildStatus = create<FeildStatusType>()(
persist(
  (set)=>({
    ...initialFeildStatus,
  initializeData:()=>set({
    ...initialFeildStatus
  }),
  changeRound:(number:number)=>set((state)=>(state.round<15?{round:state.round + number}:{})),
  changeHonba:(number:number)=>set((state)=>({honba:state.honba + number})),
  changeChips:(number:number)=>set((state)=>({chips:state.chips + number})),
  changeOyaId:(number:number)=>set(()=>({oyaId:number})),
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



export interface playerDataInterface {
  id:number,
  playerName: string,
  userId: string,
  point: number,
  riichi:boolean,
  rank:number,
  startPositionFlag:boolean[]
  tenpai:boolean,
  resultPoint:number,
}

export type playerStoreType = {
  playerData:playerDataInterface[];
  startPositonId:number[];
  playerOrder:number[];
  isMatchFinished:boolean;
  initializeData:()=>void;
  calculatedPoints:(playerId:number,number:number) => void;
  changeRiici:(playerId: number,bool:boolean)=>void;
  resetAllRiich:()=>void;
  updateRanking:()=>void;
  updateStartPosition:(positionArray:number[])=>void;
  updatePlayerStartPositionFlag: (playerId: number, positionIndex:number)=>void;
  updateTenpai: (playerId: number, bool: boolean) =>void;
  updateResultPoints: (playerId: number, number: number) =>void;
  updateNameAndUserId: (playerId: number, playerName:string,userId:string) =>void;
  updateIsMatchFinished:(flag:boolean)=>void;
}
export enum POSITION_INDEX {
  EAST=0,
  SOUTH=1,
  WEST=2,
  NORTH=3,
}


const initialPlayerArrObj:playerDataInterface[] = [
  {
    id:0,
    playerName: "",
    userId:"",
    point: 25000,
    riichi:false,
    rank:0,
    startPositionFlag:[true,false,false,false],
    tenpai:false,
    resultPoint:0,
  },
  {
    id:1,
    playerName: "",
    userId:"",
    point: 25000,
    riichi:false,
    rank:0,
    startPositionFlag:[false,true,false,false],
    tenpai:false,
    resultPoint:0,
  },

  {
    id:2,
    playerName: "",
    userId:"",
    point: 25000,
    riichi:false,
    rank:0,
    startPositionFlag:[false,false,true,false],
    tenpai:false,
    resultPoint:0,
  },
  {
    id:3,
    playerName: "",
    userId:"",
    point: 25000,
    riichi:false,
    rank:0,
    startPositionFlag:[false,false,false,true],
    tenpai:false,
    resultPoint:0,
  },
]

const initalWholeObj = {
  playerData:[...initialPlayerArrObj],
  startPositonId:[0,1,2,3],
  playerOrder:[0,1,2,3],
  isMatchFinished:false,

}

export const usePlayerStore = create<playerStoreType>()(
  persist(
    (set) => ({
        ...initalWholeObj,      
        initializeData:()=>set({
          ...initalWholeObj
      }),      
      changeRiici:(playerId: number,bool:boolean)=>set((state)=>({
        playerData:state.playerData.map((data,index)=>
        playerId === index 
        ?{...data,riichi:bool}
        :data
        )
      })),
      resetAllRiich:()=>set((state)=>({
        playerData:state.playerData.map((data)=>({...data,riichi:false}))
      })),
      calculatedPoints: (playerId: number, number: number) =>
      set((state) => ({
        playerData: state.playerData.map((data, dataIndex) =>
          dataIndex === playerId
            ? { ...data, point: data.point + number }
            : data
        ),
      })),
      updateRanking:()=>set((state)=>{
       const tempArrObj = [...state.playerData];
       const tempOrderArr:number[] = [];
       tempArrObj.sort(function(a,b){
        if(a.point === b.point){
          return state.startPositonId.indexOf(a.id) - state.startPositonId.indexOf(b.id);
        } 
        return b.point - a.point
       })
       tempArrObj.forEach(data=>{
        tempOrderArr.push(data.id);
       })

       
       const updatePlayerData = state.playerData.map((data)=>{
        const newIndex = tempArrObj.findIndex(player=>player.id === data.id);
        return {...data,rank: newIndex+1}
       })
       
       return {playerData:updatePlayerData,playerOrder:tempOrderArr}

      }),  
      updateStartPosition:(positionArray:number[])=>set(()=>({startPositonId:positionArray})),
      updatePlayerStartPositionFlag: (playerId: number, positionIndex:number) =>
      set((state) => {
        const tempFlagArray = [false,false,false,false];
        tempFlagArray[positionIndex]= true;
        const updatePlayerData = state.playerData.map((data, dataIndex) =>
        dataIndex === playerId
          ? { ...data, startPositionFlag: tempFlagArray }
          : data
        )
        return {playerData:updatePlayerData}
      }),
      updateTenpai: (playerId: number, bool: boolean) =>
      set((state) => ({
        playerData: state.playerData.map((data, dataIndex) =>
          dataIndex === playerId
            ? { ...data, tenpai: bool }
            : data
        ),
      })),
      updateResultPoints: (playerId: number, number: number) =>
      set((state) => ({
        playerData: state.playerData.map((data, dataIndex) =>
          dataIndex === playerId
            ? { ...data, resultPoint: number }
            : data
        ),
      })),
      updateNameAndUserId: (playerId: number, playerName:string,userId:string) =>
      set((state) => ({
        playerData: state.playerData.map((data, dataIndex) =>
          dataIndex === playerId
            ? { ...data, playerName: playerName, userId: userId }
            : userId === data.userId //if userId is already set, that player data will be defaulted
              ? {...data,playerName: "", userId: ""}
              : data
        ),
      })),
      updateIsMatchFinished:(flag:boolean)=>set(()=>({isMatchFinished:flag})),


    }),
    {
      name: "playerStoreData",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
