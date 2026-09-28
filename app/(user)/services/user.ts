import { prisma } from "@/lib/prisma";
import userData from "../types/user_type";

export async function getUserData({userId} : {userId: string}) {
    if (!userId) {
        return null;
    }

    const getUserData = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select:{
            email: true,
            name: true,
            first_name: true,
            last_name: true,
        }
    })

    return getUserData;
}

export async function updateUserData(userData: userData, userId: string){
    if (!userId) {
        return null;
    }

    const updateUserData = await prisma.user.update({
        where: {
            id: userId
        },
        data: userData
    })

    return updateUserData;
}