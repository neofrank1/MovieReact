// app/profile/page.tsx
import SiteNavbar from "@/components/navbar/site-navbar";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserData, getUsersReviewCount, getUsersReviews } from "@/app/(user)/actions/user";
import { AtSign, Mail, MessageSquareText, Star } from "lucide-react";
import ProfileHeader from "../../_components/profile-header";
import ReviewSection from "../../_components/review-section";
import AboutSection from "../../_components/about-section";

export const metadata: Metadata = {
  title: "Profile - Movie Critique",
  description: "View and manage your profile, reviews, and watchlist.",
};

type Props = {
  params: Promise<{ id: string }>
};

export default async function ProfilePage({params} : Props) {
  const param = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/");
  const usersReview = await getUsersReviews(param.id);
  const userData = await getUserData({ userId: param.id });
  const reviewCount = await getUsersReviewCount(param.id);
  const user_details = userData?.user_details[0];
  const first_name = user_details?.first_name;
  const last_name = user_details?.last_name;
  const nick_name = userData?.name;

  return (
    <>
      <SiteNavbar />
      <main className="mx-auto w-full max-w-5xl px-6 py-8 sm:py-12">
          <ProfileHeader first_name={first_name} last_name={last_name} nick_name={nick_name} />
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <ReviewSection usersReview={usersReview} reviewCount={reviewCount} />
          <AboutSection email={userData?.email ?? session.user.email}/>
        </div>
      </main>
    </>
  );
}