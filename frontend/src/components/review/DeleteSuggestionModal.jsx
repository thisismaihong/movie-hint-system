"use client";

import useDeleteSuggestion from "@/hooks/suggestion/useDeleteSuggestion";
import { Button, Modal } from "antd";

export default function DeleteSuggestionModal({
    open,
    id,
    title,
    onCancel,
    onSuccess,
}) {
    const { loading, handleDelete } = useDeleteSuggestion(id);

    const handleConfirm = async () => {
        const result = await handleDelete();

        if (result) {
            onSuccess?.();
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onCancel}
            centered
            footer={null}
            width={430}
            className="[&_.ant-modal-content]:!rounded-2xl"
        >
            <div className="py-2">
                <h2 className="text-lg font-bold text-[#40343B]">
                    Xóa phim bổ sung?
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#75656D]">
                    Bạn có chắc chắn muốn xóa phim{" "}
                    <span className="font-semibold text-[#40343B]">
                        "{title}"
                    </span>
                    {" "}khỏi danh sách phim bổ sung không?
                </p>

                <p className="mt-2 text-xs text-[#A28F97]">
                    Thao tác này không thể hoàn tác.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        onClick={onCancel}
                        disabled={loading}
                        className="!h-10 !rounded-xl !border-[#E5D9DE] !px-5 !font-medium !text-[#75656D]"
                    >
                        Hủy
                    </Button>

                    <Button
                        danger
                        loading={loading}
                        onClick={handleConfirm}
                        className="!h-10 !rounded-xl !px-5 !font-semibold"
                    >
                        Xóa phim
                    </Button>
                </div>
            </div>
        </Modal>
    );
}