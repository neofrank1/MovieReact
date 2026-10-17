"use client";

import { useState } from "react";
import ProfileHeader from "./profile-header";
import ProfileNameEditor from "./profile-name-editor";

type Props = {
    firstName: string;
    lastName: string;
    nickname: string | undefined;
    canEdit: boolean;
};

export default function ProfilePanel({ firstName, lastName, nickname, canEdit }: Props) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <ProfileHeader
                first_name={firstName}
                last_name={lastName}
                nick_name={nickname}
                canEdit={canEdit}
                isEditing={isEditing}
                onEdit={() => setIsEditing((open) => !open)}
            />
            {canEdit && isEditing && (
                <div className="mt-6">
                    <ProfileNameEditor
                        firstName={firstName}
                        lastName={lastName}
                        onClose={() => setIsEditing(false)}
                    />
                </div>
            )}
        </>
    );
}
