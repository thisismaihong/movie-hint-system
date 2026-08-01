"use client";
import { Pagination } from "antd";

export default function MoviePagination({
    current = 1,
    pageSize = 20,
    total = 0,
    onChange,
}) {
    return (
        <div className="mt-14 flex justify-center">
            <div className="rounded-3xl bg-gradient-to-br from-white to-slate-100 px-8 py-5 shadow-2xl ring-1 ring-white/60">
                <Pagination
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    showQuickJumper
                    showSizeChanger={false}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}