"use client";

import { useState } from "react";
import { Button, Input } from "antd";
import { LockOutlined, UserOutlined, EyeOutlined, EyeInvisibleOutlined, PlayCircleFilled } from "@ant-design/icons";
import useLogin from "@/hooks/login/useLogin";

export default function LoginForm() {
    const { loading, handleLogin } = useLogin();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(username, password);
    };

    return (
        <div className="w-full max-w-xl rounded-3xl border border-purple-400/20 bg-[#17112f]/90 p-7 shadow-2xl backdrop-blur-xl lg:p-9">

            <div className="mb-5 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/10 text-purple-500">
                    <PlayCircleFilled style={{ fontSize: 55 }} />
                </div>
            </div>

            <div className="text-center">
                <h1 className="text-3xl font-bold text-white">
                    Chào mừng trở lại!
                </h1>
                <p className="mt-3 text-gray-400">
                    Đăng nhập để tiếp tục hành trình khám phá phim ảnh
                </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-semibold text-white">
                        Tên đăng nhập
                    </label>
                    <Input
                        size="large"
                        prefix={<UserOutlined />}
                        placeholder="Nhập tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="!h-14 !rounded-xl"
                    />
                </div>

                <div className="mb-8">
                    <label className="mb-2 block text-sm font-semibold text-white">
                        Mật khẩu
                    </label>
                    <Input.Password
                        size="large"
                        prefix={<LockOutlined />}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        iconRender={(visible) =>
                            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                        }
                        className="!h-14 !rounded-xl"
                    />
                </div>

                <Button
                    htmlType="submit"
                    type="primary"
                    loading={loading}
                    block
                    size="large"
                    className="!h-14 !rounded-xl !border-0 !bg-gradient-to-r !from-purple-600 !to-indigo-500 !text-base !font-semibold shadow-lg shadow-purple-500/20"
                >
                    Đăng nhập
                </Button>

            </form>

            <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-700" />
                <span className="text-sm text-gray-500">
                    hoặc
                </span>
                <div className="h-px flex-1 bg-gray-700" />
            </div>

            {/* Google */}
            <Button
                block
                size="large"
                className="!h-14 !rounded-xl !border-gray-700 !bg-transparent !text-white hover:!border-purple-500"
            >
                <span className="mr-2 font-bold text-red-500">
                    G
                </span>
                Đăng nhập với Google
            </Button>

            <p className="mt-7 text-center text-xs leading-6 text-gray-500">
                Bằng việc đăng nhập, bạn đồng ý với
                <br />
                <span className="text-purple-400">
                    Điều khoản sử dụng
                </span>
                {" "}và{" "}
                <span className="text-purple-400">
                    Chính sách bảo mật
                </span>
            </p>
        </div>
    );
}