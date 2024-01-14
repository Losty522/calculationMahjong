"use server"
import prisma from "@/db";

export const getAllMatchHistroyData = async()=>{
  const matchResultData = await prisma.matchResult.findMany();
  return matchResultData;
}

export const getAllMatchPlayerHistroyData = async()=>{
  const matchResultData = await prisma.playerData.findMany();
  return matchResultData;
}

// export const getMatchPlayerHistroyDataById = async(matchResultId:string)=>{
//   const matchResultData = await prisma.playerData.findMany({
//     where:{
//       matchResultId:matchResultId,
//     }
//   });
//   return matchResultData;
// }
