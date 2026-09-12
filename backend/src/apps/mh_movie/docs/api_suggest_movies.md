# API SUGGESTION
## Đề xuất bổ sung phim
1. Mô tả:
- Đây là api dùng cho mục đích đề xuất bổ sung phim vào hệ thống

2. Endpoint - Method:
- POST http://localhost:8000/api/movies/suggest/

3. Input/output data:
- Input:
{
    "title_vn": "Hạ Cánh Nơi Anh",
    "title_en": "",
    "country": "Hàn Quốc",
    "description_vn": "Một nữ tài phiệt Hàn Quốc vô tình đáp xuống Triều Tiên sau một tai nạn khi chơi dù lượn và gặp một sĩ quan quân đội Triều Tiên. Từ đó, cả hai dần nảy sinh tình cảm trong hoàn cảnh đầy trớ trêu và nguy hiểm.",
    "release_year": 2019
}

- Output:
{
    "id": 3202,
    "title_vn": "Hạ Cánh Nơi Anh",
    "title_en": "",
    "description_vn": "Một nữ tài phiệt Hàn Quốc vô tình đáp xuống Triều Tiên sau một tai nạn khi chơi dù lượn và gặp một sĩ quan quân đội Triều Tiên. Từ đó, cả hai dần nảy sinh tình cảm trong hoàn cảnh đầy trớ trêu và nguy hiểm.",
    "release_year": 2019,
    "status": "PENDING"
}

![img.png](images/create_suggestion.png)

## Danh sách phim cần phê duyệt
1. Mô tả:
- Đây là api dùng cho mục đích hiển thị danh sách phim được user để xuất và cần phê duyệt

2. Endpoint - Method:
- GET http://127.0.0.1:8000/api/movies/pending/

3. Input/output data:
- Output:
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 3202,
            "title_vn": "Hạ Cánh Nơi Anh",
            "title_en": "",
            "description_vn": "Một nữ tài phiệt Hàn Quốc vô tình đáp xuống Triều Tiên sau một tai nạn khi chơi dù lượn và gặp một sĩ quan quân đội Triều Tiên. Từ đó, cả hai dần nảy sinh tình cảm trong hoàn cảnh đầy trớ trêu và nguy hiểm.",
            "release_year": 2019,
            "status": "PENDING",
            "suggested_by": "hongmai",
            "date_added": "2026-09-12T15:53:38.075032Z"
        }
    ]
}

![img.png](images/list_suggestion.png)