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
            user_details: true
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

export async function getUsersReviews(userId: string) {
    const review = await prisma.reviews.findMany({
        where: {
            user_id: userId
        },
        select: {
            id: true,
            movie: true,
            tv_show: true,
            comment: true,
            rating: true
        }
    })

    return review;
}

export async function getUsersReviewCount(userId: string) {
    const reviewCount = await prisma.reviews.count({
        where: {
            user_id: userId
        }
    })

    return reviewCount;
}