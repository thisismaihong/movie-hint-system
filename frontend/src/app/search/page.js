"use client";

import MainLayout from "@/components/layout/MainLayout";
import SearchDescription from "@/components/search/SearchDescription";
import SearchMovieGrid from "@/components/search/SearchMovieGrid";
import useSearchMovies from "@/hooks/search/useSearchMovies";
import { SearchOutlined } from "@ant-design/icons";

export default function SearchPage() {
    const {
        movies,
        loading,
        error,
        searched,
        description,
        setDescription,
        handleSearch,
    } = useSearchMovies();

    return (
        <MainLayout>
            <SearchDescription
                onSearch={handleSearch}
                loading={loading}
                description={description}
                setDescription={setDescription}
            />

            {!searched && (
                <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF7D6]">
                        <SearchOutlined className="!text-2xl !text-[#8A6D16]" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold text-white">
                        Sẵn sàng tìm kiếm
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
                        Hãy mô tả bộ phim bạn đang tìm kiếm. 
                        Bạn có thể nhớ nội dung, nhân vật, tình huống hoặc câu chuyện.
                    </p>
                </section>
            )}

            {searched && loading && (
                <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-[#D6B84C]" />

                    <p className="mt-5 text-sm text-gray-300">
                        Đang tìm những bộ phim phù hợp...
                    </p>
                </section>
            )}

            {searched && !loading && error && (
                <section className="mt-10 rounded-3xl border border-red-400/20 bg-red-500/10 p-10 text-center">
                    <h3 className="text-lg font-semibold text-red-300">
                        Không thể tìm kiếm phim
                    </h3>

                    <p className="mt-2 text-sm text-red-300/70">
                        Vui lòng thử lại sau.
                    </p>
                </section>
            )}

            {searched && !loading && !error && movies.length > 0 && (
                <section className="mt-10">
                    <div className="mb-6 flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Kết quả tìm kiếm
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                                MH chỉ hiển thị tối đa{" "}
                                <span className="font-semibold text-[#F1D58A]">
                                    {movies.length}
                                </span>{" "}
                                bộ phim phù hợp nhất với mô tả của bạn.
                            </p>
                        </div>
                    </div>

                    <SearchMovieGrid movies={movies} />
                </section>
            )}

            {searched && !loading && !error && movies.length === 0 && (
                <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
                    <h3 className="text-xl font-semibold text-white">
                        Không tìm thấy phim phù hợp
                    </h3>

                    <p className="mt-2 text-sm text-gray-400">
                        Hãy thử mô tả nội dung phim theo một cách khác.
                    </p>
                </section>
            )}
        </MainLayout>
    );
}