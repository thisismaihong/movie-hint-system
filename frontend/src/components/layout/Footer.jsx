export default function Footer() {
    return (
        <footer className="bg-[#06021f] text-white border-t border-purple-900/50">
            <div className="mx-auto max-w-7xl px-8 py-10">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold italic">
                                Movie
                                <span className="text-purple-500">
                                    Hint
                                </span>
                            </h2>
                        </div>
                        <p className="max-w-md text-sm leading-6 text-gray-400">
                            MovieHint giúp bạn khám phá những bộ phim
                            phù hợp nhất với sở thích và cảm xúc của bạn.
                        </p>

                        <div className="mt-5 flex gap-3">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-700 text-sm font-bold transition hover:bg-purple-500"
                            >
                                f
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-700 text-sm font-bold transition hover:bg-purple-500"
                            >
                                ◎
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-700 text-sm font-bold transition hover:bg-purple-500"
                            >
                                X
                            </a>
                        </div>
                        <p className="mt-6 text-sm text-gray-500">
                            © 2026 MovieHint. 
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Khám phá
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Phim
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Thể loại
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Quốc gia
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Yêu thích
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Phim phổ biến
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Hỗ trợ
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Trung tâm trợ giúp
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Điều khoản sử dụng
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Liên hệ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Phản hồi
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Về chúng tôi
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Giới thiệu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="transition hover:text-white"
                                >
                                    Đối tác
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}