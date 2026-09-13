"use client";

import { Tabs } from "antd";

const items = [
    {
        key: "PENDING",
        label: "Chờ duyệt",
    },
    {
        key: "APPROVED",
        label: "Đã duyệt",
    },
    {
        key: "REJECTED",
        label: "Từ chối",
    },
];

export default function SuggestionStatusTabs({
    activeKey = "PENDING",
    onChange,
}) {
    return (
        <div className="mb-5 rounded-2xl border border-[#F3DDE4] bg-[#FFFDFC] px-5 pt-2 shadow-[0_8px_30px_rgba(91,55,70,0.06)]">
            <Tabs
                activeKey={activeKey}
                items={items}
                onChange={onChange}
                className="[&_.ant-tabs-nav]:!mb-0 [&_.ant-tabs-tab]:!px-1 [&_.ant-tabs-tab]:!pt-3 [&_.ant-tabs-tab]:!pb-5 [&_.ant-tabs-tab]:!font-medium [&_.ant-tabs-tab]:!text-[#927F87] [&_.ant-tabs-tab:hover]:!text-[#D58C9E] [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!font-semibold [&_.ant-tabs-tab-active_.ant-tabs-tab-btn]:!text-[#C7798F] [&_.ant-tabs-ink-bar]:!h-[3px] [&_.ant-tabs-ink-bar]:!rounded-full [&_.ant-tabs-ink-bar]:!bg-gradient-to-r [&_.ant-tabs-ink-bar]:!from-[#E9A9C4] [&_.ant-tabs-ink-bar]:!to-[#F3C66D]"
            />
        </div>
    );
}