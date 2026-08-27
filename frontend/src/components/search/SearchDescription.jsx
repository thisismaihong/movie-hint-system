"use client";

import { SearchOutlined,InfoCircleOutlined } from "@ant-design/icons";
import { Button, Input, Splitter } from "antd";

const MAX_LENGTH = 200;

export default function SearchDescription({ description, setDescription, onSearch, loading }) {
    const handleSubmit = () => {
        const value = description.trim();
        if (!value) return;
        onSearch(value);
    };

    return (
        <section className="rounded-[28px] border border-[#E8E0F0] bg-white p-6 shadow-xl md:p-8">
            <div className="mb-7">
                <h1 className="text-3xl font-bold text-[#29252F] md:text-4xl">
                    Bạn đang muốn xem phim gì?
                </h1>

                <p className="mt-2 text-sm text-[#817A89] md:text-base">
                    Mô tả nội dung bạn nhớ, chúng tôi sẽ tìm những bộ phim phù hợp nhất.
                </p>
            </div>

            <Splitter className="min-h-[260px]" orientation="horizontal">
                <Splitter.Panel defaultSize="55%" min="40%" max="70%">
                    <div className="h-full pr-6">
                        <div className="flex h-full flex-col rounded-[24px] border border-[#DCCFF0] bg-[#F8F5FC] p-4">
                            <Input.TextArea
                                value={description}
                                onChange={(e) => setDescription(e.target.value.slice(0, MAX_LENGTH))}
                                onPressEnter={(e) => {
                                    if (!e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                                placeholder="Ví dụ: Một bộ phim về hai người yêu nhau nhưng phải duy trì mối quan hệ yêu xa..."
                                autoSize={{ minRows: 6, maxRows: 8 }}
                                maxLength={MAX_LENGTH}
                                showCount
                                variant={false}
                                className="search-description-input !flex-1 !bg-transparent !text-[#29252F] !shadow-none"
                                styles={{
                                    textarea: {
                                        background: "transparent",
                                        color: "#29252F",
                                        fontSize: 15,
                                        lineHeight: 1.7,
                                    },
                                }}
                            />
                            <p className="mt-3 flex items-start gap-2 rounded-xl border border-[#F1DFA8] bg-[#FFF9E8] px-3 py-2.5 text-xs leading-5 text-[#7A6A3A]">
                                <InfoCircleOutlined className="mt-0.5 shrink-0" />
                                <span>Lưu ý: Mô tả càng rõ càng tốt và hạn chế sử dụng từ viết tắt để có kết quả chính xác hơn.</span>
                            </p>

                            <div className="mt-3 flex items-center justify-end border-t border-[#E2D9EF] pt-3">
                                <Button
                                    type="primary"
                                    loading={loading}
                                    disabled={!description.trim()}
                                    icon={<SearchOutlined />}
                                    onClick={handleSubmit}
                                    className="!h-11 !rounded-full !border-none !bg-[#B9A7E8] !px-6 !font-semibold !text-white hover:!bg-[#A995DC] disabled:!bg-[#E8E3EF] disabled:!text-[#AAA3B3]"
                                >
                                    Tìm phim
                                </Button>
                            </div>
                        </div>
                    </div>
                </Splitter.Panel>

                <Splitter.Panel defaultSize="45%" min="30%">
                    <div className="flex h-full items-center pl-6">
                        <div className="w-full rounded-[24px] bg-[#FAF8FD] p-6">
                            <div className="mb-5">
                                <h2 className="text-lg font-bold text-[#332D3B]">
                                    Bạn có thể mô tả như thế nào?
                                </h2>

                                <p className="mt-1 text-sm leading-6 text-[#817A89]">
                                    Hãy kể những gì bạn nhớ về nội dung phim.
                                </p>
                            </div>

                            <div className="space-y-3">
                                <div className="rounded-2xl border border-[#E4DDF0] bg-[#F5F1FB] p-4">
                                    <p className="text-sm leading-6 text-[#514A5C]">
                                        “Một bộ phim về hai người yêu nhau nhưng phải duy trì mối quan hệ yêu xa.”
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#E4DDF0] bg-[#F5F1FB] p-4">
                                    <p className="text-sm leading-6 text-[#514A5C]">
                                        “Phim kể về một người con trở về quê sau khi cha mình mất.”
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#E4DDF0] bg-[#F5F1FB] p-4">
                                    <p className="text-sm leading-6 text-[#514A5C]">
                                        “Một nhóm bạn trẻ bị mắc kẹt trong một ngôi nhà và phải tìm cách sống sót.”
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Splitter.Panel>
            </Splitter>
        </section>
    );
}