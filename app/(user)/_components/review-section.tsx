import Image from "next/image"
import { Star } from "lucide-react"
import { IMAGE_BASE } from "@/lib/tmdb";

type Review = {
    id: number;
    movie: {
        movie_title: string;
        poster_path: string;
    } | null,
    tv_show: {
        tv_title: string;
        poster_path: string;
    } | null,
    rating: number;
    comment: string;
};

type ReviewSectionProps = {
    usersReview: Review[];
    reviewCount: number;
};
  
export default function ReviewSection({usersReview, reviewCount} : ReviewSectionProps) {
    return (
        <>
            <section className="rounded-large border border-divider bg-content2 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Activity</p>
                        <h2 className="mt-1 text-lg font-semibold text-foreground">Recent reviews</h2>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {reviewCount ? reviewCount : 0} reviews
                    </span>
                </div>

                <div className="mt-5 divide-y divide-divider border-t border-divider">
                {usersReview.map((review) => (
                    <article key={review.id} className="flex items-center gap-4 py-4 first:pt-4">
                        <div className="relative h-14 w-11 shrink-0 overflow-hidden rounded-medium border border-divider bg-background">
                            {review.movie?.poster_path ? (
                            <Image
                                src={`${IMAGE_BASE}${review.movie?.poster_path ? review.movie?.poster_path : review.tv_show?.poster_path}`}
                                alt={review.movie?.movie_title ?? "Untitled"}
                                fill
                                sizes={"44px"}
                                loading="lazy"
                                className="object-cover"
                            />
                            ) : (
                            <Image
                                src={`${IMAGE_BASE}${review.tv_show?.poster_path}`}
                                alt={review.tv_show?.tv_title ?? "Untitled"}
                                fill
                                sizes={"44px"}
                                loading="lazy"
                                className="object-cover"
                            />
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">{review.movie?.movie_title ? review.movie?.movie_title: review.tv_show?.tv_title}</p>
                            <p className="mt-1 text-xs text-foreground-500">{review.comment}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-warning">
                            <Star size={14} fill="currentColor" />
                            {review.rating}
                        </div>
                    </article>
                ))}
                </div>
          </section>
        </>
    )
}