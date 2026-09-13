"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { HomeOutlined, StarOutlined, SearchOutlined, HeartOutlined, TrophyOutlined, 
    HistoryOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined , PlaySquareOutlined,
     PlusCircleOutlined, FileSearchOutlined} from "@ant-design/icons";

import { Button, Menu } from "antd";
import { useAuth } from "@/hooks/useAuth";


const items = [
    {
        key: "/",
        icon: <HomeOutlined />,
        label: "Trang chủ",
    },
    {
        key: "/movies",
        icon: <PlaySquareOutlined />,
        label: "Kho phim của MH",
    },
    {
        key: "/recommendations",
        icon: <StarOutlined />,
        label: "Phim đề xuất",
        userOnly: true,
    },
    {
        key: "/search",
        icon: <SearchOutlined />,
        label: "Tìm kiếm thông minh",
        userOnly: true,
    },
    {
        key: "/favorites",
        icon: <HeartOutlined />,
        label: "Yêu thích",
        userOnly: true,
    },
    {
        key:"/suggestion",
        icon: <PlusCircleOutlined /> ,
        label:"Bổ sung phim",
        userOnly:true,
    },
    {
        key:"/review",
        icon: <FileSearchOutlined /> ,
        label:"Phim cần duyệt",
        adminOnly: true,
    },
    {
        key: "/profile",
        icon: <UserOutlined />,
        label: "Hồ sơ",
        userOnly: true,
    },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const router = useRouter();
    const pathname = usePathname();

    const publicRoutes=[
        "/",
        "/movies"
    ]

    const {isAuthenticated, isInitializing, user} = useAuth();
    const auth = useAuth();
    console.log(auth);

    const visibleItems = items
        .filter((item) => {
            if (item.userOnly) {
                return user?.role === "user";
            }

            if (item.adminOnly) {
                return user?.role === "admin";
            }

            return true;
        })
        .map(({ userOnly, adminOnly, ...item }) => item);

    const handleMenuClick = ({ key }) => {
        if (isInitializing) return;
        console.log({
            key,
            isAuthenticated,
            isPublic: publicRoutes.includes(key),
        });
        if (!publicRoutes.includes(key) && !isAuthenticated) {
            router.push("/login");
            return;
        }
        
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
                items={visibleItems}
                onClick={handleMenuClick}
                className="!bg-transparent"
            />

        </aside>
    );
}