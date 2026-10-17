"use client";

import { updateProfileName } from "@/app/(user)/actions/user";
import { useActionState } from "react";
import { Check, LoaderCircle, UserRound, X } from "lucide-react";

const initialState = {
    status: "idle" as const,
    message: "",
};

type Props = {
    firstName: string;
    lastName: string;
    onClose: () => void;
};

export default function ProfileNameEditor({ firstName, lastName, onClose }: Props) {
    const [state, formAction, isPending] = useActionState(updateProfileName, initialState);

    return (
        <section
            id="profile-name-editor"
            className="scroll-mt-24 rounded-large border border-divider bg-content2 p-5 sm:p-6"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <span className="rounded-medium bg-primary/10 p-2.5 text-primary">
                        <UserRound size={18} />
                    </span>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            Profile settings
                        </p>
                        <h2 className="mt-1 text-lg font-semibold text-foreground">Your profile name</h2>
                        <p className="mt-1 text-sm text-foreground-500">
                            This is the name other members see on your profile.
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close profile settings"
                    className="rounded-small p-2 text-foreground-500 transition hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <X size={18} />
                </button>
            </div>

            <form action={formAction} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-foreground">
                        First name
                        <input
                            name="firstName"
                            type="text"
                            autoComplete="given-name"
                            defaultValue={firstName}
                            required
                            maxLength={40}
                            className="mt-1.5 w-full rounded-medium border border-divider bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </label>
                    <label className="block text-sm font-medium text-foreground">
                        Last name
                        <input
                            name="lastName"
                            type="text"
                            autoComplete="family-name"
                            defaultValue={lastName}
                            maxLength={40}
                            className="mt-1.5 w-full rounded-medium border border-divider bg-background px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                    </label>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p
                        aria-live="polite"
                        role={state.status === "error" ? "alert" : "status"}
                        className={`min-h-5 text-sm ${
                            state.status === "success"
                                ? "text-success"
                                : state.status === "error"
                                  ? "text-danger"
                                  : "text-foreground-500"
                        }`}
                    >
                        {state.status === "idle" ? "Your name appears at the top of your profile." : state.message}
                    </p>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-medium bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? (
                            <LoaderCircle size={16} className="animate-spin" />
                        ) : state.status === "success" ? (
                            <Check size={16} />
                        ) : null}
                        {isPending ? "Saving..." : "Save name"}
                    </button>
                </div>
            </form>
        </section>
    );
}
