import { AtSign, Pencil, Star } from "lucide-react"

type Props = {
    first_name: string | null | undefined,
    last_name: string | null | undefined,
    nick_name: string | undefined,
    canEdit: boolean,
    isEditing: boolean,
    onEdit: () => void
}

export default function ProfileHeader({ first_name, last_name, nick_name, canEdit, isEditing, onEdit } : Props) {

    const displayName = [first_name, last_name].filter(Boolean).join(" ") || nick_name || "Movie fan";
    const username = nick_name || "movie-fan";
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <>
            <section className="overflow-hidden rounded-large border border-divider bg-content2 shadow-small">
                <div className="relative h-28 overflow-hidden bg-linear-to-r from-primary/35 via-primary/15 to-transparent sm:h-36">
                    <div className="absolute -right-10 -top-20 h-48 w-48 rounded-full border border-primary/20 sm:h-64 sm:w-64" />
                    <div className="absolute -right-2 -top-12 h-36 w-36 rounded-full border border-primary/20 sm:h-48 sm:w-48" />
                </div>
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
                    <div className="flex flex-wrap items-center gap-3 sm:pb-1">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                            <Star size={14} fill="currentColor" />
                            MovieCritique member
                        </div>
                        {canEdit && (
                            <button
                                type="button"
                                onClick={onEdit}
                                aria-expanded={isEditing}
                                aria-controls="profile-name-editor"
                                className="inline-flex items-center gap-2 rounded-medium border border-divider bg-background px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                                <Pencil size={14} />
                                {isEditing ? "Close editor" : "Edit profile"}
                            </button>
                        )}
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}