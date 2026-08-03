"use client";

import dayjs from "dayjs";
import Image from "next/image";
import {MailOutlined, CalendarOutlined, IdcardOutlined,
     CheckCircleFilled, EditOutlined, LockOutlined, ClockCircleOutlined, 
     CloseCircleFilled} from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Space, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function UserProfileCard({profile, onEdit, onChangePassword}) {
    if (!profile) return null;

    const fullName = `${profile.last_name || ""} ${profile.first_name || ""}`.trim() || "Chưa cập nhật";

    const gender = profile.gender === "male" ? "Nam"
            : profile.gender === "female" ? "Nữ" 
            : "Khác";

    const statusConfig = {
        active: {
            color: "success",
            icon: <CheckCircleFilled />,
        },
        inactive: {
            color: "warning",
            icon: <ClockCircleOutlined />,
        },
        banned: {
            color: "error",
            icon: <CloseCircleFilled />,
        },
    };

    const currentStatus = statusConfig[profile.status] ?? {color: "default", icon: null};

    return (
        <Card className="overflow-hidden rounded-3xl !border-white/10 !bg-[#211d38] shadow-2xl"
            styles={{ body: { padding: 0 } }}
        >
            <div className="p-5 sm:p-7 lg:p-8">
                <div className="flex flex-col items-center text-center">
                    {profile.avatar ? (
                        <Image
                            src={profile.avatar}
                            alt="avatar"
                            width={120}
                            height={120}
                            className="h-24 w-24 rounded-full object-cover ring-4 ring-purple-500/30 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                        />
                    ) : (
                        <Avatar
                            size={{xs: 80, sm: 100, md: 120}}
                            className="!bg-purple-600"
                        >
                            {profile.username?.[0].toUpperCase()}
                        </Avatar>
                    )}

                    <Title level={3} className="!mb-1 !mt-5 !text-center !text-white">
                        {profile.username}
                    </Title>

                    <Text className="!text-center !text-base !text-gray-300 sm:!text-lg">
                        {fullName}
                    </Text>

                    <Space wrap size={[8, 8]} className="mt-4 justify-center">
                        <Tag color="purple">
                            {profile.role?.toUpperCase()}
                        </Tag>
                        <Tag color={currentStatus.color} icon={currentStatus.icon}>
                            {profile.status}
                        </Tag>
                    </Space>
                </div>

                <Divider className="!my-6 !border-white/10" />

                <div className="space-y-5">
                    <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600">
                            <MailOutlined className="text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <Text className="!text-gray-400">
                                Email
                            </Text>
                            <br />
                            <Text className="!break-all !text-white">
                                {profile.email}
                            </Text>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600">
                            <IdcardOutlined className="text-white" />
                        </div>
                        <div className="flex-1">
                            <Text className="!text-gray-400">
                                Giới tính
                            </Text>
                            <br />
                            <Text className="!text-white">
                                {gender}
                            </Text>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600">
                            <CalendarOutlined className="text-white" />
                        </div>
                        <div className="flex-1">
                            <Text className="!text-gray-400">
                                Ngày sinh
                            </Text>
                            <br />
                            <Text className="!text-white">
                                {profile.date_of_birth
                                    ? dayjs(profile.date_of_birth).format(
                                          "DD/MM/YYYY"
                                      )
                                    : "Chưa cập nhật"}
                            </Text>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600">
                            <CalendarOutlined className="text-white" />
                        </div>
                        <div className="flex-1">
                            <Text className="!text-gray-400">
                                Thành viên từ
                            </Text>
                            <br />
                            <Text className="!text-white">
                                {dayjs(profile.date_joined).format(
                                    "DD/MM/YYYY"
                                )}
                            </Text>
                        </div>
                    </div>
                </div>

                <Divider className="!my-6 !border-white/10" />

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                        block
                        icon={<EditOutlined />}
                        type="primary"
                        size="large"
                        onClick={onEdit}
                        className="!h-11 !rounded-xl !border-0 !font-semibold sm:!w-auto"
                        style={{ background: "linear-gradient(90deg,#7C3AED,#A855F7)" }}
                    >
                        Chỉnh sửa
                    </Button>

                    <Button
                        block
                        icon={<LockOutlined />}
                        size="large"
                        onClick={onChangePassword}
                        className="!h-11 !rounded-xl !border-white/20 !bg-white/5 !text-white hover:!border-purple-400 hover:!text-purple-300 sm:!w-auto"
                    >
                        Đổi mật khẩu
                    </Button>
                </div>
            </div>
        </Card>
    );
}