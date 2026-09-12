"use client";

import { Card, Empty, Modal, Spin, Typography, Button } from "antd";
import { DeleteOutlined, MessageOutlined } from "@ant-design/icons";
import useFeedbacks from "@/hooks/movie/useFeedbacks";
import CreateFeedback from "./createFeedback";
import { useAuth } from "@/hooks/useAuth";
import useDeleteFeedback from "@/hooks/movie/useDeleteFeedback";
import { useState } from "react";

const { Text } = Typography;

export default function MovieFeedbacks({ movieId }) {
    const { feedbacks, setFeedbacks, loading, error } = useFeedbacks(movieId);
    const { user } = useAuth();
    const { loading: deleteLoading, handleDelete } = useDeleteFeedback();

    const [visibleCount, setVisibleCount] = useState(5);

    const formatDate = (date) => {
        return new Date(date).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const confirmDelete = (feedbackId) => {
        Modal.confirm({
            title: "Xóa đánh giá?",
            content: "Bạn có chắc chắn muốn xóa đánh giá này không?",
            okText: "Xóa",
            cancelText: "Hủy",
            okType: "danger",
            onOk: () =>
                handleDelete(feedbackId, () => {
                    setFeedbacks((prev) =>
                        prev.filter((item) => item.id !== feedbackId)
                    );
                })
        });
    };

    const visibleFeedbacks = feedbacks.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 5);
    };

    return (
        <div className="mt-10 mb-10 px-5">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                    <MessageOutlined className="text-lg" />
                </div>

                <div className="flex items-center gap-2.5">
                    <h2 className="m-0 text-xl font-semibold text-white">
                        Đánh giá
                    </h2>

                    <span className="rounded-full border border-purple-400/20 bg-purple-500/15 px-2.5 py-1 text-xs font-medium text-purple-300">
                        {feedbacks.length}
                    </span>
                </div>
            </div>

            <CreateFeedback
                movieId={movieId}
                username={user?.username}
                onSuccess={(newFeedback) => {
                    setFeedbacks((prev) => [newFeedback, ...prev]);
                    setVisibleCount((prev) => Math.max(prev, 5));
                }}
            />

            <div className="mt-6">
                {loading ? (
                    <div className="flex items-center justify-center rounded-2xl border border-white/5 bg-[#2d2943]/70 py-14">
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm text-red-300">
                        Không thể tải đánh giá. Vui lòng thử lại.
                    </div>
                ) : feedbacks.length === 0 ? (
                    <Card className="rounded-2xl! border-white/5! bg-[#2d2943]! shadow-none!">
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                                <span className="text-sm text-gray-400">
                                    Chưa có đánh giá nào cho bộ phim này.
                                </span>
                            }
                        />
                    </Card>
                ) : (
                    <>
                        <div className="flex flex-col gap-2">
                            {visibleFeedbacks.map((feedback) => {
                                const isOwner =
                                    feedback.username === user?.username;

                                return (
                                    <Card
                                        key={feedback.id}
                                        className="rounded-xl! border border-[#4A4563]! bg-[#36314F]! px-0! py-0! shadow-none! transition-all duration-200 hover:border-purple-400/40!"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Text className="text-sm! font-semibold! text-white!">
                                                {feedback.username}
                                            </Text>

                                            <div className="ml-auto grid grid-cols-[auto_32px] items-center gap-3">
                                                <span className="text-right text-[10px] text-gray-400">
                                                    {formatDate(
                                                        feedback.created_date
                                                    )}
                                                </span>

                                                <div className="flex h-8 w-8 items-center justify-center">
                                                    {isOwner && (
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                deleteLoading
                                                            }
                                                            onClick={() =>
                                                                confirmDelete(
                                                                    feedback.id
                                                                )
                                                            }
                                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/15 text-red-400 shadow-sm shadow-red-500/10 transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 active:scale-90"
                                                        >
                                                            <DeleteOutlined className="text-sm" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-1.5 mb-0! text-xs leading-5 text-gray-300">
                                            {feedback.content}
                                        </p>
                                    </Card>
                                );
                            })}
                        </div>

                        {visibleCount < feedbacks.length && (
                            <div className="mt-4 flex justify-center">
                                <Button
                                    type="default"
                                    size="small"
                                    onClick={handleLoadMore}
                                    className="!rounded-lg !border-purple-400/30 !bg-purple-500/10 !px-4 !text-xs !text-purple-300 hover:!border-purple-400/50 hover:!bg-purple-500/20 hover:!text-purple-200"
                                >
                                    Xem thêm ... 
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}