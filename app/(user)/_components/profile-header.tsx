import { AtSign, Star } from "lucide-react"

type Props = {
    first_name: String | null | undefined,
    last_name: String | null | undefined,
    nick_name: String | undefined
}

export default function ProfileHeader({ first_name, last_name, nick_name } : Props) {

    const displayName = [first_name, last_name].filter(Boolean).join(" ") || nick_name || "Movie fan";
    const username = nick_name || "movie-fan";
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <>
            <section className="overflow-hidden rounded-large border border-divider bg-content2">
                <div className="h-28 bg-linear-to-r from-primary/35 via-primary/15 to-transparent sm:h-36" />
                <div className="px-5 pb-6 sm:px-8 sm:pb-8">
                    <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-end gap-4">
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-content2 bg-primary text-3xl font-semibold text-primary-foreground shadow-medium sm:h-28 sm:w-28">
                        {initial}
                        </div>
                        <div className="pb-1">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Member profile</p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{displayName}</h1>
                        <p className="mt-1 flex items-center gap-1 text-sm text-foreground-500">
                            <AtSign size={14} />
                            {username}
                        </p>
                        </div>
                    </div>
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                        <Star size={14} fill="currentColor" />
                        MovieCritique member
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}