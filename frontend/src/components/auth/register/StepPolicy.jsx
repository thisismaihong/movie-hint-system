"use client";

import { Checkbox } from "antd";
import {
    SafetyOutlined,
    CheckCircleOutlined,
} from "@ant-design/icons";

export default function StepPolicy({ agreed, setAgreed }) {
    return (
        <div className="mx-auto max-w-2xl space-y-8">

            <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
                    <SafetyOutlined className="text-2xl" />
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Hoàn tất đăng ký
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Vui lòng xem lại điều khoản và xác nhận trước khi tạo tài khoản MovieHint.
                </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

                <h3 className="mb-4 font-semibold text-gray-900">
                    Điều khoản cung cấp thông tin cá nhân
                </h3>

                <div className="max-h-56 overflow-y-auto pr-3 text-sm leading-7 text-gray-600">

                    <p>
                        Khi đăng ký tài khoản MovieHint, hãy xác nhận nếu bạn đồng ý cung cấp
                        thông tin cá nhân.
                    </p>

                    <p className="mt-4">
                        Các thông tin cá nhân và sở thích
                        xem phim có thể được sử dụng để quản lý tài khoản và
                        cá nhân hóa trải nghiệm đề xuất phim.
                    </p>

                    <p className="mt-4">
                        Dữ liệu về sở thích xem phim được sử dụng nhằm giúp hệ thống
                        phân tích nhu cầu và cung cấp các đề xuất phù hợp với từng
                        người dùng.
                    </p>

                    <p className="mt-4">
                        Bạn có quyền cập nhật thông tin cá nhân và sở thích của mình
                        sau khi đăng ký tài khoản.
                    </p>

                </div>
            </div>

            <div className={`rounded-2xl border p-5 transition ${agreed ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}`}>
                <Checkbox
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                >
                    <span className="text-sm leading-6 text-gray-700">
                        Tôi đã đọc, hiểu và đồng ý với các điều khoản cung cấp
                        thông tin cá nhân của MovieHint.
                    </span>
                </Checkbox>
                {agreed && (
                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-green-600">
                        <CheckCircleOutlined />
                        Bạn đã xác nhận điều khoản.
                    </div>
                )}
            </div>

        </div>
    );
}