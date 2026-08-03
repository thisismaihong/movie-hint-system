"use client";

import { Form, Input, Modal, Button } from "antd";
import {LockOutlined, KeyOutlined, SafetyCertificateOutlined} from "@ant-design/icons";

import useChangePassword from "@/hooks/profile/useChangePassword";

export default function ChangePasswordModal({open, onClose}) {
    const [form] = Form.useForm();
    const { loading, handleChange } = useChangePassword();

    const onFinish = async (values) => {
        const success = await handleChange(values);
        if (success) {
            form.resetFields();
            onClose();
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={520}
            destroyOnHidden
        >
            <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <SafetyCertificateOutlined className="text-3xl text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Đổi mật khẩu
                </h2>
                <p className="mt-2 text-gray-500">
                    Hãy nhập mật khẩu hiện tại và mật khẩu mới của bạn.
                </p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="old_password"
                    label={<span className="font-medium text-gray-700">Mật khẩu hiện tại</span>}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu hiện tại",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400" />}
                        size="large"
                        className="!h-12 !rounded-xl"
                    />
                </Form.Item>

                <Form.Item
                    name="new_password"
                    label={
                        <span className="font-medium text-gray-700">
                            Mật khẩu mới
                        </span>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu mới",
                        },
                        {
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                            message:
                                "Mật khẩu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.",
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<KeyOutlined className="text-gray-400" />}
                        size="large"
                        className="!h-12 !rounded-xl"
                    />
                </Form.Item>

                <p className="mb-6 -mt-4 text-xs text-gray-400">
                    Mật khẩu tối thiểu 8 ký tự, bao gồm chữ hoa, chữ thường,
                    số và ký tự đặc biệt.
                </p>

                <Form.Item
                    name="confirm_password"
                    label={<span className="font-medium text-gray-700">Xác nhận mật khẩu</span>}
                    dependencies={["new_password"]}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng xác nhận mật khẩu",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("new_password") === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error("Mật khẩu xác nhận không khớp")
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<SafetyCertificateOutlined className="text-gray-400" />}
                        size="large"
                        className="!h-12 !rounded-xl"
                    />
                </Form.Item>

                <div className="mt-8 flex justify-end gap-3">
                    <Button
                        onClick={onClose}
                        className="!h-11 !rounded-xl !px-6"
                    >
                        Hủy
                    </Button>

                    <Button
                        htmlType="submit"
                        loading={loading}
                        type="primary"
                        className="!h-11 !rounded-xl !border-0 !px-6 !font-semibold"
                        style={{
                            background: "linear-gradient(90deg,#7C3AED,#A855F7)",
                        }}
                    >
                        Đổi mật khẩu
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}