"use client";

import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import useApproveSuggestion from "@/hooks/suggestion/useApproveSuggestion";
import { getGenres } from "@/services/movieService";

const { TextArea } = Input;

export default function ApproveMovieForm({ id, onSuccess }) {
    const [form] = Form.useForm();
    const [genres, setGenres] = useState([]);
    const [loadingGenres, setLoadingGenres] = useState(false);

    const { loading, handleApprove } = useApproveSuggestion(id);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoadingGenres(true);

                const data = await getGenres();

                setGenres(data.results || data);
            } catch (error) {
                console.log("Lỗi lấy danh sách thể loại: ", error);
            } finally {
                setLoadingGenres(false);
            }
        };

        fetchGenres();
    }, []);

    const handleSubmit = async (values) => {
        const formData = new FormData();

        formData.append("description_en", values.description_en);

        if (values.title_en) {
            formData.append("title_en", values.title_en);
        }

        if (values.poster?.length) {
            formData.append(
                "poster",
                values.poster[0].originFileObj
            );
        }

        if (values.age_rating) {
            formData.append("age_rating", values.age_rating);
        }

        if (values.duration) {
            formData.append("duration", values.duration);
        }

        values.genres?.forEach((genre) => {
            formData.append("genres", genre);
        });

        values.actors?.forEach((actor) => {
            formData.append("actors", actor);
        });

        values.directors?.forEach((director) => {
            formData.append("directors", director);
        });

        values.platforms?.forEach((platform) => {
            formData.append("platforms", platform);
        });

        if (values.admin_note) {
            formData.append("admin_note", values.admin_note);
        }

        const result = await handleApprove(formData);

        if (result) {
            onSuccess?.(result);
        }
    };

    return (
        <div className="mt-8 rounded-[24px] border border-[#3A3155] bg-[#211D38] p-7 shadow-[0_14px_45px_rgba(0,0,0,0.2)]">
            <div className="mb-7">
                <h2 className="text-xl font-bold text-white">
                    Bổ sung thông tin phim
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Kiểm tra và bổ sung đầy đủ thông tin trước khi duyệt phim.
                </p>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
            >
                <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                    <Form.Item
                        label={
                            <span className="text-gray-200">
                                Tên phim tiếng Anh
                            </span>
                        }
                        name="title_en"
                    >
                        <Input
                            placeholder="Nhập tên phim tiếng Anh"
                            className="!h-11 !rounded-xl"
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="text-gray-200">
                                Độ tuổi
                            </span>
                        }
                        name="age_rating"
                    >
                        <Select
                            placeholder="Chọn độ tuổi"
                            className="!h-11"
                            options={[
                                { value: "all", label: "Không giới hạn" },
                                { value: "13+", label: "13+" },
                                { value: "16+", label: "16+" },
                                { value: "18+", label: "18+" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="text-gray-200">
                                Thời lượng
                            </span>
                        }
                        name="duration"
                    >
                        <Input
                            placeholder="Ví dụ: 16 tập"
                            className="!h-11 !rounded-xl"
                        />
                    </Form.Item>

                    <Form.Item
                        label={
                            <span className="text-gray-200">
                                Thể loại
                            </span>
                        }
                        name="genres"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn thể loại.",
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            loading={loadingGenres}
                            placeholder="Chọn thể loại"
                            options={genres.map((genre) => ({
                                value: genre.name,
                                label: genre.name,
                            }))}
                            className="!min-h-11"
                        />
                    </Form.Item>
                </div>

                <Form.Item
                    label={
                        <span className="text-gray-200">
                            Mô tả tiếng Anh
                        </span>
                    }
                    name="description_en"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mô tả tiếng Anh.",
                        },
                    ]}
                >
                    <TextArea
                        rows={5}
                        placeholder="Nhập mô tả phim bằng tiếng Anh"
                        className="!rounded-xl"
                    />
                </Form.Item>

                <Form.Item
                    label={
                        <span className="!font-medium !text-[#F5E9EE]">
                            Poster phim
                        </span>
                    }
                    name="poster"
                    valuePropName="fileList"
                    getValueFromEvent={(event) => event.fileList}
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false}
                        accept="image/png,image/jpeg,image/webp, image/jpg"
                        className="[&_.ant-upload]:!border-[#E9A9C4] [&_.ant-upload]:!bg-[#FFF9F7] [&_.ant-upload]:!text-[#C7798F] [&_.ant-upload:hover]:!border-[#F3C66D] [&_.ant-upload:hover]:!text-[#D99A8A] [&_.ant-upload-list-item]:!rounded-xl"
                    >
                        <div className="flex flex-col items-center justify-center text-[#C7798F]">
                            <PlusOutlined className="!text-xl" />
                            <div className="mt-2 text-xs font-medium text-[#8A747D]">
                                Chọn poster
                            </div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label={
                        <span className="text-gray-200">
                            Diễn viên
                        </span>
                    }
                    required
                >
                    <Form.List
                        name="actors"
                        rules={[
                            {
                                validator: async (_, actors) => {
                                    if (!actors || actors.length === 0) {
                                        return Promise.reject(
                                            new Error(
                                                "Vui lòng thêm ít nhất một diễn viên."
                                            )
                                        );
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }) => (
                            <div className="space-y-3">
                                {fields.map(({ key, name, ...restField }) => (
                                    <div
                                        key={key}
                                        className="flex gap-3"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={name}
                                            className="mb-0 flex-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                        "Vui lòng nhập tên diễn viên.",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Nhập tên diễn viên"
                                                className="!h-11 !rounded-xl"
                                            />
                                        </Form.Item>

                                        <Button
                                            type="text"
                                            danger
                                            icon={<MinusCircleOutlined />}
                                            onClick={() => remove(name)}
                                            className="!h-11 !w-11"
                                        />
                                    </div>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    className="!h-11 !rounded-xl"
                                >
                                    Thêm diễn viên
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item
                    label={
                        <span className="text-gray-200">
                            Đạo diễn
                        </span>
                    }
                    required
                >
                    <Form.List
                        name="directors"
                        rules={[
                            {
                                validator: async (_, directors) => {
                                    if (
                                        !directors ||
                                        directors.length === 0
                                    ) {
                                        return Promise.reject(
                                            new Error(
                                                "Vui lòng thêm ít nhất một đạo diễn."
                                            )
                                        );
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }) => (
                            <div className="space-y-3">
                                {fields.map(({ key, name, ...restField }) => (
                                    <div
                                        key={key}
                                        className="flex gap-3"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={name}
                                            className="mb-0 flex-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                        "Vui lòng nhập tên đạo diễn.",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Nhập tên đạo diễn"
                                                className="!h-11 !rounded-xl"
                                            />
                                        </Form.Item>

                                        <Button
                                            type="text"
                                            danger
                                            icon={<MinusCircleOutlined />}
                                            onClick={() => remove(name)}
                                            className="!h-11 !w-11"
                                        />
                                    </div>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    className="!h-11 !rounded-xl"
                                >
                                    Thêm đạo diễn
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item
                    label={
                        <span className="text-gray-200">
                            Nền tảng
                        </span>
                    }
                >
                    <Form.List name="platforms">
                        {(fields, { add, remove }) => (
                            <div className="space-y-3">
                                {fields.map(({ key, name, ...restField }) => (
                                    <div
                                        key={key}
                                        className="flex gap-3"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={name}
                                            className="mb-0 flex-1"
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message:
                                                        "Vui lòng nhập nền tảng.",
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder="Ví dụ: Netflix"
                                                className="!h-11 !rounded-xl"
                                            />
                                        </Form.Item>

                                        <Button
                                            type="text"
                                            danger
                                            icon={<MinusCircleOutlined />}
                                            onClick={() => remove(name)}
                                            className="!h-11 !w-11"
                                        />
                                    </div>
                                ))}

                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    className="!h-11 !rounded-xl"
                                >
                                    Thêm nền tảng
                                </Button>
                            </div>
                        )}
                    </Form.List>
                </Form.Item>

                <Form.Item
                    label={
                        <span className="text-gray-200">
                            Ghi chú quản trị
                        </span>
                    }
                    name="admin_note"
                >
                    <TextArea
                        rows={4}
                        placeholder="Nhập ghi chú khi duyệt phim"
                        className="!rounded-xl"
                    />
                </Form.Item>

                <div className="mt-8 flex justify-end">
                    <Button
                        htmlType="submit"
                        type="primary"
                        loading={loading}
                        className="!h-11 !rounded-xl !border-none !bg-[#A855F7] !px-7 !font-semibold hover:!bg-[#9333EA]"
                    >
                        Duyệt phim
                    </Button>
                </div>
            </Form>
        </div>
    );
}