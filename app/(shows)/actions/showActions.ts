"use server";

import { prisma } from "@/lib/prisma";
import { Review, TvReview } from "../types/show_types";

export async function insertMovieReview(review: Review) {

    const movie = await prisma.movies.upsert({
       where: {
            movie_id: review.showId
       },
       update: {},
       create: {
        movie_id: review.showId,
        movie_title: review.movie_title,
        poster_path: review.movie_poster,
       }
    });

    const newReview = await prisma.reviews.create({
        data: {
            user_id: review.userId,
            movie_id: review.showId,
            rating: review.rating,
            comment: review.comment
        }
    })

    if (movie && newReview) {
        return {
            success: true,
            message: "Review inserted successfully"
        }
    } else {
        return {
            success: false,
            message: "Failed to insert review"
        }
    }
}

export async function getMovieReviews(movieId: string) {
    const reviews = await prisma.reviews.findMany({
        where: {
            movie_id: movieId
        },
        select: {
            id: true,
            user: {
                select: {
                    name: true,
                    id: true
                }
            },
            rating: true,
            comment: true
        },
        orderBy: {
            id: "desc"
        }
    });

    return reviews;
}

export async function checkMovieReviewed(movie_id: string, user_id: string) {
    if (!movie_id || !user_id) {
        return;
    }

    const reviewed = await prisma.reviews.findFirst({
        where: {
            user_id: user_id,
            movie_id: movie_id
        }
    });

    const hasReviewed: boolean = Boolean(reviewed);

    return hasReviewed;
}

export async function insertTVReview(review: TvReview) {

    const tv = await prisma.tVShow.upsert({
       where: {
            tv_show_id: review.showId
       },
       update: {},
       create: {
        tv_show_id: review.showId,
        tv_title: review.tv_title,
        poster_path: review.tv_poster,
       }
    });

    const newReview = await prisma.reviews.create({
        data: {
            user_id: review.userId,
            tv_id: review.showId,
            rating: review.rating,
            comment: review.comment
        }
    })

    if (tv && newReview) {
        return {
            success: true,
            message: "Review inserted successfully"
        }
    } else {
        return {
            success: false,
            message: "Failed to insert review"
        }
    }
}

export async function getTVShowReviews(tv_show_id: string) {

    if (!tv_show_id) {
        return [];
    }

    const reviews = await prisma.reviews.findMany({
        where: {
            tv_id: tv_show_id
        },
        select: {
            id: true,
            user: {
                select: {
                    name: true,
                    id: true
                }
            },
            rating: true,
            comment: true
        },
        orderBy: {
            id: "desc"
        }
    });

    return reviews;
}

export async function checkTVShowReviewed(tv_show_id: string, user_id: string) {
    if (!tv_show_id || !user_id) {
        return;
    }

    const reviewed = await prisma.reviews.findFirst({
        where: {
            user_id: user_id,
            tv_id: tv_show_id
        }
    });

    const hasReviewed: boolean = Boolean(reviewed);

    return hasReviewed;
}

export async function countLikes(reviewId: number) {

    if (!reviewId) {
        return 0;
    }

    const count = await prisma.likes.count({
        where: {
            review_id: reviewId
        }
    });

    return count;
}

export async function deleteReview(userId: string,reviewId: number) { 
    
    if (!userId || !reviewId) {
        console.log("Invalid userId or reviewId");
        return;
    }

    const deletedReview = await prisma.reviews.deleteMany({
        where: {
            id: reviewId,
            user_id: userId
        }
    });

    return deletedReview;
}
