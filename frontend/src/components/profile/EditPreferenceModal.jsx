"use client";

import { useEffect } from "react";

import {
    Button,
    Form,
    Modal,
    Select,
} from "antd";

import {
    CalendarOutlined,
    GlobalOutlined,
    TagsOutlined,
} from "@ant-design/icons";

import { Sparkles } from "lucide-react";
import useUpdatePreference from "@/hooks/profile/useUpdatePreference";


const yearOptions = Array.from(
    { length: 70 },
    (_, index) => {
        const year = 2026 - index;

        return {
            value: year,
            label: year.toString(),
        };
    }
);

export default function EditPreferenceModal({
    open,
    onClose,
    preferences,
}) {
    const [form] = Form.useForm();

    const {
        loading,
        loadingOptions,
        genres,
        countries,
        handleUpdate,
    } = useUpdatePreference();

    useEffect(() => {
        if (!open || !preferences) return;

        form.setFieldsValue({
            preferred_release_year_from:
                preferences.preferred_release_year_from,

            preferred_release_year_to:
                preferences.preferred_release_year_to,

            genres:
                preferences.genres?.map(
                    (item) => item.id
                ) || [],

            countries:
                preferences.countries?.map(
                    (item) => item.id
                ) || [],
        });
    }, [open, preferences, form]);

    const onFinish = async (values) => {
        const success = await handleUpdate(values);

        if (success) {
            onClose();
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            width={700}
            destroyOnHidden
        >
            <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                    <Sparkles
                        size={30}
                        className="text-purple-600"
                    />
                </div>

                <h2 className="text-2xl font-bold">
                    Chỉnh sửa sở thích
                </h2>

                <p className="mt-2 text-gray-500">
                    Cập nhật sở thích để MovieHint
                    đưa ra những bộ phim phù hợp hơn.
                </p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <div className="space-y-7">

                    {/* Release year */}

                    <div>

                        <div className="mb-3 flex items-center gap-2">

                            <CalendarOutlined className="text-purple-600" />

                            <span className="font-semibold">
                                Khoảng thời gian phát hành
                            </span>

                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            <Form.Item
                                name="preferred_release_year_from"
                                className="!mb-0"
                            >
                                <Select
                                    size="large"
                                    placeholder="Từ năm"
                                    options={yearOptions}
                                    className="w-full"
                                />
                            </Form.Item>

                            <Form.Item
                                name="preferred_release_year_to"
                                className="!mb-0"
                                dependencies={[
                                    "preferred_release_year_from",
                                ]}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            const from =
                                                getFieldValue(
                                                    "preferred_release_year_from"
                                                );

                                            if (
                                                !from ||
                                                !value ||
                                                value >= from
                                            ) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error(
                                                    "Năm kết thúc phải lớn hơn hoặc bằng năm bắt đầu."
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Đến năm"
                                    options={yearOptions}
                                    className="w-full"
                                />
                            </Form.Item>

                        </div>

                    </div>

                    {/* Genres */}

                    <div>

                        <div className="mb-3 flex items-center gap-2">

                            <TagsOutlined className="text-purple-600" />

                            <span className="font-semibold">
                                Thể loại yêu thích
                            </span>

                        </div>

                        <Form.Item
                            name="genres"
                            className="!mb-0"
                        >
                            <Select
                                mode="multiple"
                                size="large"
                                maxCount={5}
                                loading={loadingOptions}
                                placeholder="Chọn tối đa 5 thể loại"
                                maxTagCount="responsive"
                                options={genres.map(
                                    (genre) => ({
                                        value: genre.id,
                                        label: genre.name,
                                    })
                                )}
                            />
                        </Form.Item>

                        <p className="mt-2 text-xs text-gray-400">
                            Bạn chỉ được chọn tối đa
                            5 thể loại.
                        </p>

                    </div>

                    {/* Countries */}

                    <div>

                        <div className="mb-3 flex items-center gap-2">

                            <GlobalOutlined className="text-purple-600" />

                            <span className="font-semibold">
                                Quốc gia yêu thích
                            </span>

                        </div>

                        <Form.Item
                            name="countries"
                            className="!mb-0"
                        >
                            <Select
                                mode="multiple"
                                size="large"
                                maxCount={5}
                                loading={loadingOptions}
                                placeholder="Chọn tối đa 5 quốc gia"
                                maxTagCount="responsive"
                                options={countries.map(
                                    (country) => ({
                                        value: country.id,
                                        label: country.name,
                                    })
                                )}
                            />
                        </Form.Item>

                        <p className="mt-2 text-xs text-gray-400">
                            Bạn chỉ được chọn tối đa
                            5 quốc gia.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-5">

                        <div className="flex gap-3">

                            <Sparkles className="text-purple-600" />

                            <div>

                                <h3 className="font-semibold text-gray-800">
                                    Cá nhân hóa đề xuất
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-gray-500">
                                    MovieHint sẽ sử dụng
                                    các thông tin này để
                                    đề xuất những bộ phim
                                    sát với sở thích của
                                    bạn hơn.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-8 flex justify-end gap-3">

                    <Button
                        onClick={onClose}
                        className="!h-11 !rounded-xl !border-red-500/30 !bg-red-500/10 !px-6 !text-red-500 hover:!border-red-400 hover:!bg-red-500/20 hover:!text-black"
                    >
                        Hủy
                    </Button>

                    <Button
                        htmlType="submit"
                        loading={loading}
                        type="primary"
                        className="!h-11 !rounded-xl !border-0 !px-6 !font-semibold"
                        style={{
                            background:
                                "linear-gradient(90deg,#7C3AED,#A855F7)",
                        }}
                    >
                        Lưu thay đổi
                    </Button>

                </div>

            </Form>
        </Modal>
    );
}