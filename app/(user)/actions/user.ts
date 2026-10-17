"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import userData from "../types/user_type";

type ProfileNameState = {
    status: "idle" | "success" | "error";
    message: string;
};

export async function updateProfileName(
    _previousState: ProfileNameState,
    formData: FormData
): Promise<ProfileNameState> {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { status: "error", message: "Sign in to update your profile name." };
    }

    const firstNameValue = formData.get("firstName");
    const lastNameValue = formData.get("lastName");
    const firstName = typeof firstNameValue === "string" ? firstNameValue.trim() : "";
    const lastName = typeof lastNameValue === "string" ? lastNameValue.trim() : "";

    if (!firstName || firstName.length > 40 || lastName.length > 40) {
        return {
            status: "error",
            message: "Enter a first name and keep each name to 40 characters or fewer.",
        };
    }

    await prisma.userDetails.upsert({
        where: { user_id: session.user.id },
        create: {
            user_id: session.user.id,
            first_name: firstName,
            last_name: lastName || null,
        },
        update: {
            first_name: firstName,
            last_name: lastName || null,
        },
    });

    revalidatePath(`/profile/${session.user.id}`);

    return { status: "success", message: "Your profile name has been updated." };
}

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