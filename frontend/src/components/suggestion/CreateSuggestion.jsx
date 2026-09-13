"use client";

import { Button, Form, Input, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const currentYear = new Date().getFullYear();
const releaseYears = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => currentYear - index);

export default function CreateSuggestion({ countries, loadingCountries, loading, error, handleSubmit, MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH }) {
    const [form] = Form.useForm();

    const handleFinish = async (values) => {
        const success = await handleSubmit(values);

        if (success) {
            form.resetFields();
        }
    };

    const countryOptions = countries.map((country) => ({
        label: country.name || country,
        value: country.name || country,
    }));

    const yearOptions = releaseYears.map((year) => ({
        label: year,
        value: year,
    }));

    const inputClass = "!h-12 !rounded-xl !border-[#F4CDD8] !bg-[#FFF9F6] !text-[#51434A] !shadow-sm placeholder:!text-[#B5A3AA] hover:!border-[#F1B49F] focus:!border-[#E9B95E] focus:!shadow-[0_0_0_3px_rgba(233,185,94,0.12)]";

    const selectClass = "[&_.ant-select-selector]:!min-h-12 [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!border-[#F4CDD8] [&_.ant-select-selector]:!bg-[#FFF9F6] [&_.ant-select-selector]:!shadow-sm [&_.ant-select-selection-placeholder]:!text-[#B5A3AA] [&_.ant-select-selection-item]:!text-[#51434A] [&_.ant-select-arrow]:!text-[#D99A8A] hover:[&_.ant-select-selector]:!border-[#F1B49F]";

    return (
        <section className="mx-auto max-w-4xl pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                    Bổ sung phim
                </h1>
                <div className="mt-3 h-1.5 w-12 rounded-full bg-gradient-to-r from-[#F6C978] via-[#F4A99A] to-[#E9A9C4]" />
            </div>

            <div className="rounded-[28px] border border-[#F4DCE3] bg-[#FFFDFC] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:p-9">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    requiredMark={false}
                >
                    <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                        <Form.Item
                            label={<span className="font-semibold text-[#5C4A52]">Tên phim tiếng Việt</span>}
                            name="title_vn"
                            rules={[
                                { required: true, message: "Vui lòng nhập tên phim tiếng Việt." },
                                { max: MAX_TITLE_LENGTH, message: `Tên phim không được vượt quá ${MAX_TITLE_LENGTH} ký tự.` },
                            ]}
                        >
                            <Input
                                maxLength={MAX_TITLE_LENGTH}
                                showCount
                                placeholder="Nhập tên phim"
                                className={inputClass}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="font-semibold text-[#5C4A52]">Tên phim tiếng Anh</span>}
                            name="title_en"
                            rules={[
                                { max: MAX_TITLE_LENGTH, message: `Tên phim không được vượt quá ${MAX_TITLE_LENGTH} ký tự.` },
                            ]}
                        >
                            <Input
                                maxLength={MAX_TITLE_LENGTH}
                                showCount
                                placeholder="Nhập tên phim tiếng Anh"
                                className={inputClass}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label={<span className="font-semibold text-[#5C4A52]">Quốc gia</span>}
                        name="country"
                        rules={[
                            { required: true, message: "Vui lòng chọn ít nhất một quốc gia." },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            loading={loadingCountries}
                            options={countryOptions}
                            placeholder="Chọn quốc gia"
                            maxTagCount="responsive"
                            className={selectClass}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="font-semibold text-[#5C4A52]">Năm phát hành</span>}
                        name="release_year"
                        rules={[
                            { required: true, message: "Vui lòng chọn năm phát hành." },
                        ]}
                    >
                        <Select
                            showSearch
                            options={yearOptions}
                            placeholder="Chọn năm phát hành"
                            className={selectClass}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span className="font-semibold text-[#5C4A52]">Mô tả phim</span>}
                        name="description_vn"
                        rules={[
                            { required: true, message: "Vui lòng nhập mô tả phim." },
                            { max: MAX_DESCRIPTION_LENGTH, message: `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự.` },
                        ]}
                    >
                        <TextArea
                            rows={7}
                            maxLength={MAX_DESCRIPTION_LENGTH}
                            showCount
                            placeholder="Nhập mô tả nội dung phim..."
                            className="!rounded-xl !border-[#F4CDD8] !bg-[#FFF9F6] !text-[#51434A] !shadow-sm placeholder:!text-[#B5A3AA] hover:!border-[#F1B49F] focus:!border-[#E9B95E] focus:!shadow-[0_0_0_3px_rgba(233,185,94,0.12)]"
                        />
                    </Form.Item>

                    <div className="mt-8 flex justify-end border-t border-[#F3E4E8] pt-6">
                        <Button
                            htmlType="submit"
                            type="primary"
                            loading={loading}
                            icon={<SendOutlined />}
                            className="!h-12 !rounded-xl !border-none !bg-gradient-to-r !from-[#EFA8B9] !via-[#F1A99A] !to-[#F3C66D] !px-7 !font-semibold !text-[#553E46] !shadow-[0_8px_24px_rgba(239,168,185,0.3)] hover:!brightness-105"
                        >
                            Gửi đề nghị
                        </Button>
                    </div>
                </Form>
            </div>
        </section>
    );
}