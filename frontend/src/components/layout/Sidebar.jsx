"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { HomeOutlined, StarOutlined, SearchOutlined, HeartOutlined, TrophyOutlined, 
    HistoryOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import { Button, Menu } from "antd";

const items = [
    {
        key: "/",
        icon: <HomeOutlined />,
        label: "Trang chủ",
    },
    {
        key: "/recommendations",
        icon: <StarOutlined />,
        label: "Phim đề xuất",
    },
    {
        key: "/search",
        icon: <SearchOutlined />,
        label: "Tìm kiếm thông minh",
    },
    {
        key: "/favorites",
        icon: <HeartOutlined />,
        label: "Yêu thích",
    },
    {
        key: "/ratings",
        icon: <TrophyOutlined />,
        label: "Đánh giá của tôi",
    },
    {
        key: "/history",
        icon: <HistoryOutlined />,
        label: "Lịch sử tìm kiếm",
    },
    {
        key: "/profile",
        icon: <UserOutlined />,
        label: "Hồ sơ",
    },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const handleMenuClick = ({ key }) => {
        router.push(key);
    };

    return (
        <aside
            className={`
                min-h-[calc(100vh-64px)]
                bg-[#09051f]
                border-r
                border-purple-900
                transition-all
                duration-300
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            <div className="flex justify-end p-3">
                <Button
                    type="text"
                    className="!text-white"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed
                        ? <MenuUnfoldOutlined />
                        : <MenuFoldOutlined />
                    }
                </Button>
            </div>

            <Menu
                mode="inline"
                theme="dark"
                inlineCollapsed={collapsed}
                selectedKeys={[pathname]}
                items={items}
                onClick={handleMenuClick}
                className="!bg-transparent"
            />

        </aside>
    );
}