"use server"
import prisma from "@/db";

export const addUser = async(userName:string)=>{
  await prisma.user.create({
    data: {
      userName: userName,
    },
  });
}

export const getUniqueUserData = async(userName:string)=>{
  const userData = await prisma.user.findUnique({
    where: {userName:userName}
  })
  if(userData){
    return userData;
  }else{
    return null
  }
}

export async function getAllUsers() {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
}