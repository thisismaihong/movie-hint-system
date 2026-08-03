"use client";

import { EditOutlined, CalendarOutlined, GlobalOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Space, Tag, Typography } from "antd";

const { Title, Text } = Typography;

export default function PreferenceCard({ preferences, onEdit }) {
    if (!preferences) {
        return (
            <Card className="rounded-3xl !border-white/10 !bg-[#211d38] shadow-2xl">
                <Empty description={<span className="text-gray-400">Chưa có thông tin sở thích</span>} />
            </Card>
        );
    }

    return (
        <Card
            className="rounded-3xl !border-white/10 !bg-[#211d38] shadow-2xl"
            styles={{ body: { padding: 32 } }}
            title={<Title level={4} className="!mb-0 !text-white">Sở thích phim</Title>}
            extra={
                <Button
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={onEdit}
                    className="!rounded-xl !border-0 !font-semibold"
                    style={{ background: "linear-gradient(90deg,#7C3AED,#A855F7)" }}
                >
                    Chỉnh sửa
                </Button>
            }
        >
            <div className="mb-8">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600">
                        <CalendarOutlined className="text-white" />
                    </div>
                    <Text className="!font-semibold !text-white">Khoảng năm phát hành phim yêu thích</Text>
                </div>

                <Tag className="!rounded-full !border-0 !bg-purple-500/20 !px-4 !py-1 !text-purple-200">
                    {preferences?.preferred_release_year_from} - {preferences?.preferred_release_year_to}
                </Tag>
            </div>

            <div className="mb-8">
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-600">
                        <TagsOutlined className="text-white" />
                    </div>
                    <Text className="!font-semibold !text-white">Thể loại yêu thích</Text>
                </div>

                {preferences?.genres.length === 0 ? (
                    <Text className="!text-gray-400">Chưa cập nhật</Text>
                ) : (
                    <Space wrap size={[8, 12]}>
                        {preferences.genres.map((genre) => (
                            <Tag key={genre.id} className="!rounded-full !border-0 !bg-pink-500/20 !px-4 !py-1 !text-pink-200">
                                {genre.name}
                            </Tag>
                        ))}
                    </Space>
                )}
            </div>

            <div>
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600">
                        <GlobalOutlined className="text-white" />
                    </div>
                    <Text className="!font-semibold !text-white">Quốc gia yêu thích</Text>
                </div>

                {preferences?.countries.length === 0 ? (
                    <Text className="!text-gray-400">Chưa cập nhật</Text>
                ) : (
                    <Space wrap size={[8, 12]}>
                        {preferences.countries.map((country) => (
                            <Tag key={country.id} className="!rounded-full !border-0 !bg-green-500/20 !px-4 !py-1 !text-green-200">
                                {country.name}
                            </Tag>
                        ))}
                    </Space>
                )}
            </div>
        </Card>
    );
}