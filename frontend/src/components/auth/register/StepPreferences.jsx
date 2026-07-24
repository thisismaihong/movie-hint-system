"use client";

import {
    Select,
    Typography,
} from "antd";

import {
    CalendarOutlined,
    TagsOutlined,
    GlobalOutlined,
} from "@ant-design/icons";
import { Sparkle } from "lucide-react";


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



export default function StepPreferences({ formData, setFormData, preferencesError, genres, countries, loadingOptions }) {

    const updatePreference = (field, value) => {
        setFormData({
            ...formData,
            preferences: {
                ...formData.preferences,
                [field]: value,
            },
        });
    };


    return (
        <div className="space-y-8">

            <div>
                <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                        <TagsOutlined className="text-lg" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Sở thích xem phim
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Cho chúng tôi biết bạn yêu thích những bộ phim như thế nào.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">

                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <CalendarOutlined className="text-purple-600" />

                        <span className="text-sm font-semibold text-gray-700">
                            Khoảng thời gian phát hành yêu thích
                        </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <Select
                            size="large"
                            placeholder="Từ năm"
                            options={yearOptions}
                            value={
                                formData.preferences.preferred_release_year_from ||
                                undefined
                            }
                            onChange={(value) =>
                                updatePreference(
                                    "preferred_release_year_from",
                                    value
                                )
                            }
                            className="w-full"
                        />

                        <Select
                            size="large"
                            placeholder="Đến năm"
                            options={yearOptions}
                            value={
                                formData.preferences.preferred_release_year_to ||
                                undefined
                            }
                            onChange={(value) =>
                                updatePreference(
                                    "preferred_release_year_to",
                                    value
                                )
                            }
                            className="w-full"
                        />

                    </div>
                    {preferencesError && (
                        <p className="mt-2 text-sm text-red-500">
                            {preferencesError}
                        </p>
                    )}
                </div>

                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <TagsOutlined className="text-purple-600" />

                        <span className="text-sm font-semibold text-gray-700">
                            Thể loại yêu thích
                        </span>
                    </div>

                    <Select
                        mode="multiple"
                        size="large"
                        loading={loadingOptions}
                        placeholder="Chọn tối đa 5 thể loại phim" maxCount={5}
                        options={genres.map((genre) => ({
                            label: genre.name,
                            value: genre.id,
                        }))}
                        value={formData.preferences.genres}
                        onChange={(values) => updatePreference("genres", values)}
                        className="w-full"
                        maxTagCount="responsive"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                        Bạn có thể chọn tối đa 5 thể loại phim yêu thích.
                    </p>
                </div>

                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <GlobalOutlined className="text-purple-600" />

                        <span className="text-sm font-semibold text-gray-700">
                            Quốc gia yêu thích
                        </span>
                    </div>

                    <Select
                        mode="multiple"
                        size="large"
                        loading={loadingOptions}
                        placeholder="Chọn tối đa 5 quốc gia" maxCount={5}
                        options={countries.map((country) => ({
                            label: country.name,
                            value: country.id,
                        }))}
                        value={formData.preferences.countries}
                        onChange={(values) => updatePreference("countries", values)}
                        className="w-full"
                        maxTagCount="responsive"
                    />

                    <p className="mt-2 text-xs text-gray-400">
                        Bạn có thể chọn tối đa 5 quốc gia yêu thích.
                    </p>
                </div>

            </div>

            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-5">
                <div className="flex gap-3">
                    <Sparkle/>
                    <div>
                        <h3 className="font-semibold text-gray-800">
                            Cá nhân hóa đề xuất
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            Những lựa chọn này sẽ được sử dụng để giúp MovieHint
                            hiểu sở thích của bạn và đưa ra những bộ phim phù hợp.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}