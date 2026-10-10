"use server";

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

    if (!userId) {
        return 0;
    }

    const reviewCount = await prisma.reviews.count({
        where: {
            user_id: userId
        }
    })

    return reviewCount;
}

export async function userLikes(userId: string, reviewId: number) {

    if (!userId || !reviewId) {
        return null;
    }

    const liked = await prisma.likes.create({
        data: {
            user_id: userId,
            review_id: reviewId
        }
    })

    return liked;
}

export async function userUnlikes(userId: string, reviewId: number) {

    if (!userId || !reviewId) {
        return null;
    }

    const unliked = await prisma.likes.deleteMany({
        where: {
            user_id: userId,
            review_id: reviewId
        }
    })

    return unliked;
}

export async function checkUserLiked(userId: string | undefined, reviewId: number) {

    if (!userId || !reviewId) {
        return false;
    }

    const liked = await prisma.likes.findFirst({
        where: {
            user_id: userId,
            review_id: reviewId
        }
    })

    const hasLiked: boolean = Boolean(liked);

    return hasLiked;
}