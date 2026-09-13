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
- GET http://127.0.0.1:8000/api/movies/suggested/

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


## Chi tiết phim cần phê duyệt
1. Mô tả:
- Đây là api dùng cho mục đích hiển thị danh sách phim được user để xuất và cần phê duyệt

2. Endpoint - Method:
- GET http://127.0.0.1:8000/api/movies/3202/suggested/

3. Input/output data:
- Output:
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

![img.png](images/detail_suggestion.png)



## Duyệt phim bổ sung
1. Mô tả:
- Đây là api dùng cho mục đích duyệt phim được user để xuất bổ sung

2. Endpoint - Method:
- POST http://localhost:8000/api/movies/3202/suggested/approve/

3. Input/output data:
- Input:
{
    "description_en": "A South Korean heiress accidentally lands in North Korea after a paragliding accident and meets a North Korean army officer. Their unexpected encounter gradually develops into a romantic relationship.",
    "title_en": "Crash Landing on You",
    "age_rating": "13+",
    "duration": "16 tập",
    "genres": [
        "Lãng mạn",
        "Giật gân"
    ],
    "actors": [
        "Hyun Bin",
        "Son Ye-jin"
    ],
    "directors": [
        "Lee Jung-hyo"
    ],
    "platforms": [
        "Netflix"
    ],
    "admin_note": "Đã kiểm tra và bổ sung đầy đủ thông tin phim."
}
- Output:
{
    "id": 3202,
    "title_vn": "Hạ Cánh Nơi Anh",
    "title_en": "Crash Landing on You",
    "release_year": 2019,
    "age_rating": "13+",
    "duration": "16 tập",
    "genres": [
        {
            "id": 7,
            "name": "Giật gân"
        },
        {
            "id": 8,
            "name": "Lãng mạn"
        }
    ],
    "countries": [
        {
            "id": 43,
            "name": "Hàn Quốc"
        }
    ],
    "directors": [
        {
            "id": 939,
            "name": "Lee Jung-hyo"
        }
    ],
    "actors": [
        {
            "id": 6551,
            "name": "Hyun Bin"
        },
        {
            "id": 6552,
            "name": "Son Ye-jin"
        }
    ],
    "platforms": [
        {
            "id": 1,
            "name": "Netflix"
        }
    ],
    "poster": null,
    "description_vn": "Một nữ tài phiệt Hàn Quốc vô tình đáp xuống Triều Tiên sau một tai nạn khi chơi dù lượn và gặp một sĩ quan quân đội Triều Tiên. Từ đó, cả hai dần nảy sinh tình cảm trong hoàn cảnh đầy trớ trêu và nguy hiểm.",
    "description_en": "A South Korean heiress accidentally lands in North Korea after a paragliding accident and meets a North Korean army officer. Their unexpected encounter gradually develops into a romantic relationship."
}

![img.png](images/approve_suggestion.png)