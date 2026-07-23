"use client";

import { Input, Select, DatePicker } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const genderOptions = [
    {
        value: "male",
        label: "Nam",
    },
    {
        value: "female",
        label: "Nữ",
    },
];

export default function StepPersonal({ formData, setFormData, usernameError, emailError, passwordError }) {

    const updateField = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    return (
        <div className="space-y-8">

            <div>
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                        <UserOutlined className="text-lg" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Thông tin cá nhân
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Hãy cung cấp một số thông tin cơ bản để tạo tài khoản MovieHint.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Tên đăng nhập
                    </label>

                    <Input
                        size="large"
                        prefix={<UserOutlined />}
                        placeholder="Nhập tên đăng nhập"
                        value={formData.username}
                        status={
                            usernameError
                                ? "error"
                                : ""
                        }
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            });
                        }}
                        className="!h-14 !rounded-xl"
                    />

                    {usernameError && (
                        <p className="mt-2 text-sm text-red-500">
                            {usernameError}
                        </p>
                    )}

                    <p className="mt-2 text-xs text-gray-400">
                        Từ 4-30 ký tự, chỉ bao gồm chữ cái,
                        số và dấu gạch dưới.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Email
                    </label>

                    <Input
                        size="large"
                        type="email"
                        prefix={<MailOutlined />}
                        placeholder="Nhập địa chỉ email"
                        value={formData.email}
                        status={
                            emailError
                                ? "error"
                                : ""
                        }
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            });
                        }}
                        className="!h-14 !rounded-xl"
                    />

                    {emailError && (
                        <p className="mt-2 text-sm text-red-500">
                            {emailError}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Mật khẩu
                    </label>

                    <Input.Password
                        size="large"
                        prefix={<LockOutlined className="text-gray-400" />}
                        placeholder="Nhập mật khẩu"
                        value={formData.password}
                        status={passwordError ? "error" : ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        className="!h-12 !rounded-xl"
                    />

                    {passwordError && (
                        <p className="mt-2 text-sm text-red-500">
                            {passwordError}
                        </p>
                    )}
                    <p className="mt-2 text-xs text-gray-400">
                        Mật khẩu tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Giới tính
                    </label>

                    <Select
                        size="large"
                        placeholder="Chọn giới tính"
                        options={genderOptions}
                        value={formData.gender || undefined}
                        onChange={(value) =>
                            updateField("gender", value)
                        }
                        className="w-full"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Năm sinh
                    </label>

                    <DatePicker
                        size="large"
                        placeholder="Chọn ngày sinh"
                        format="DD/MM/YYYY"
                        suffixIcon={<CalendarOutlined />}
                        value={formData.date_of_birth}
                        disabledDate={(current) => current && current.isAfter(dayjs(), "day")}
                        onChange={(value) => updateField("date_of_birth", value)}
                        className="!h-12 !w-full !rounded-xl"
                    />
                </div>

            </div>
        </div>
    );
}