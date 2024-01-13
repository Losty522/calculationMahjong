"use server"
import { resultObjType } from "@/components/editMatchBonus/EditMatchBonus";
import prisma from "@/db";

export const addMatchResult = async(resultObj:resultObjType)=>{

  enum PLAYER_ORDER_INDEX{
    FIRST_PLACE_PLAYER = 0,
    SECOND_PLACE_PLAYER = 1,
    THIRD_PLACE_PLAYER = 2,
    FORTH_PLACE_PLAYER = 3,
  }
  try {

    await prisma.matchResult.create({
      data: {
        timestamp :resultObj.timestamp,
        returnFlag : resultObj.returnFlag,
        placeBonus  : resultObj.placeBonus,
        customBonus: resultObj.customBonus,
        playerData : {
          create:[
            {
            point: resultObj.PlayerData[PLAYER_ORDER_INDEX.FIRST_PLACE_PLAYER].point,
            resultPoint:resultObj.PlayerData[PLAYER_ORDER_INDEX.FIRST_PLACE_PLAYER].resultPoint,
            userId: resultObj.PlayerData[PLAYER_ORDER_INDEX.FIRST_PLACE_PLAYER].userId,
            userName: resultObj.PlayerData[PLAYER_ORDER_INDEX.FIRST_PLACE_PLAYER].userName,
          },
          {
            point: resultObj.PlayerData[PLAYER_ORDER_INDEX.SECOND_PLACE_PLAYER].point,
            resultPoint:resultObj.PlayerData[PLAYER_ORDER_INDEX.SECOND_PLACE_PLAYER].resultPoint,
            userId: resultObj.PlayerData[PLAYER_ORDER_INDEX.SECOND_PLACE_PLAYER].userId,
            userName: resultObj.PlayerData[PLAYER_ORDER_INDEX.SECOND_PLACE_PLAYER].userName,
          },
  
          {
            point: resultObj.PlayerData[PLAYER_ORDER_INDEX.THIRD_PLACE_PLAYER].point,
            resultPoint:resultObj.PlayerData[PLAYER_ORDER_INDEX.THIRD_PLACE_PLAYER].resultPoint,
            userId: resultObj.PlayerData[PLAYER_ORDER_INDEX.THIRD_PLACE_PLAYER].userId,
            userName: resultObj.PlayerData[PLAYER_ORDER_INDEX.THIRD_PLACE_PLAYER].userName,
          },
          {
            point: resultObj.PlayerData[PLAYER_ORDER_INDEX.FORTH_PLACE_PLAYER].point,
            resultPoint:resultObj.PlayerData[PLAYER_ORDER_INDEX.FORTH_PLACE_PLAYER].resultPoint,
            userId: resultObj.PlayerData[PLAYER_ORDER_INDEX.FORTH_PLACE_PLAYER].userId,
            userName: resultObj.PlayerData[PLAYER_ORDER_INDEX.FORTH_PLACE_PLAYER].userName,
          },
  
        ]
        }
      
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;  
  }
}
