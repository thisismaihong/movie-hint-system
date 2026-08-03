"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, Button, Form, Input, Modal, Upload } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import useUpdateProfile from "@/hooks/profile/useUpdateProfile";

export default function EditProfileModal({ open, onClose, profile }) {
    const [form] = Form.useForm();
    const { loading, handleUpdate } = useUpdateProfile();
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (!open || !profile) return;

        form.setFieldsValue({
            first_name: profile.first_name,
            last_name: profile.last_name,
        });

        setPreview(profile.avatar);
        setFile(null);
    }, [open, profile, form]);

    const beforeUpload = (file) => {
        setFile(file);
        setPreview(URL.createObjectURL(file));
        return false;
    };

    const onFinish = async (values) => {
        console.log(values);
        const success = await handleUpdate({
            ...values,
            avatar: file,
        });
        if (success) onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            destroyOnHidden
            centered
            width={520}
            className="profile-modal"
        >
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <div className="mb-8 flex flex-col items-center">
                    <div className="relative">
                        {preview ? (
                            <Image src={preview} width={120} height={120} alt="" className="h-30 w-30 rounded-full object-cover ring-4 ring-purple-500/30" />
                        ) : (
                            <Avatar size={120} className="!bg-purple-600 !text-4xl ring-4 ring-purple-500/30">
                                {profile?.username?.[0]}
                            </Avatar>
                        )}
                        <Upload showUploadList={false} beforeUpload={beforeUpload}>
                            <Button shape="circle" icon={<CameraOutlined />} className="!absolute -bottom-1 -right-1 !h-10 !w-10 !border-0 !bg-purple-600 !text-white hover:!bg-purple-500" />
                        </Upload>
                    </div>
                </div>

                <Form.Item label={<span className="text-white">Họ</span>} name="last_name">
                    <Input size="large" className="!h-12 !rounded-xl !border-white/10 !bg-[#2d2943] !text-white" />
                </Form.Item>

                <Form.Item label={<span className="text-white">Tên</span>} name="first_name">
                    <Input size="large" className="!h-12 !rounded-xl !border-white/10 !bg-[#2d2943] !text-white" />
                </Form.Item>

                <div className="mt-8 flex justify-end gap-3">
                    <Button onClick={onClose} className="!h-11 !rounded-xl !border-red-500/30 !bg-red-500/10 !px-6 !text-red-500 hover:!border-red-400 hover:!bg-red-500/20 hover:!text-black">
                        Hủy
                    </Button>

                    <Button type="primary" htmlType="submit" loading={loading} className="!h-11 !rounded-xl !border-0 !px-6 !font-semibold" style={{ background: "linear-gradient(90deg,#7C3AED,#A855F7)" }}>
                        Lưu thay đổi
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}