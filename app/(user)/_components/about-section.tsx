import {Mail, MessageSquareText} from "lucide-react"

type Props = {
    email: string
}

export default function AboutSection({email}: Props) {
    return (
        <>
            <aside className="h-fit rounded-large border border-divider bg-content2 p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">About</p>
                    <h2 className="mt-1 text-lg font-semibold text-foreground">Profile details</h2>
                    <dl className="mt-5 space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 rounded-medium bg-background p-2 text-primary">
                        <Mail size={16} />
                        </span>
                        <div className="min-w-0">
                        <dt className="text-xs text-foreground-500">Email address</dt>
                        <dd className="mt-1 truncate text-sm font-medium text-foreground">{email}</dd>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 rounded-medium bg-background p-2 text-primary">
                        <MessageSquareText size={16} />
                        </span>
                        <div>
                        <dt className="text-xs text-foreground-500">Community</dt>
                        <dd className="mt-1 text-sm font-medium text-foreground">Sharing reviews and recommendations</dd>
                        </div>
                    </div>
                    </dl>
            </aside>
        </>
    )
}