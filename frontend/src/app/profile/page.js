"use client";

import MainLayout from "@/components/layout/MainLayout";
import ChangePasswordModal from "@/components/profile/ChangePasswordModal";
import EditPreferenceModal from "@/components/profile/EditPreferenceModal";
import EditProfileModal from "@/components/profile/EditProfileModal";

import PreferenceCard from "@/components/profile/PreferenceCard";
import UserProfileCard from "@/components/profile/UserProfileCard";
import { useProfile } from "@/hooks/profile/useProfile";
import { Spin } from "antd";
import { useState } from "react";


export default function ProfilePage(){

    const { loading, profile, preferences } = useProfile();
    const [openEdit, setOpenEdit]=useState(false);
    const [openPassword, setOpenPassword] = useState(false);
    const [openPreference, setOpenPreference] = useState(false);

    if (loading) {
        return (
            <MainLayout>
                <div className="flex min-h-[70vh] items-center justify-center">
                    <Spin size="large" description="Đang tải thông tin..." />
                </div>
            </MainLayout>
        );
    }

    return(
        <MainLayout>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div className="xl:col-span-4">
                    <UserProfileCard
                        profile={profile}
                        onEdit={() => setOpenEdit(true)}
                        onChangePassword={() => setOpenPassword(true)}
                    />
                    <EditProfileModal
                        open={openEdit}
                        onClose={() => setOpenEdit(false)}
                        profile={profile}
                    />
                    <ChangePasswordModal
                        open={openPassword}
                        onClose={() => setOpenPassword(false)}
                    />

                </div>
                <div className="xl:col-span-8">
                    <PreferenceCard
                        preferences={preferences}
                        onEdit={() => setOpenPreference(true)}
                    />
                    <EditPreferenceModal
                        open={openPreference}
                        onClose={() => setOpenPreference(false)}
                        preferences={preferences}
                    />
                </div>
            </div>
        </MainLayout>
    );

}