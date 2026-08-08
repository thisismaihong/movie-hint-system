# API RECOMMENDATION
## Xem danh sách phim đề xuất
1. Mô tả:
- Đây là api dùng cho mục đích xem danh sách phim đề xuất theo sở thích và hành vi (có lý do)

2. Endpoint - Method:
- GET api/recommendation/movies/

3. Input/output data:
- Output:
[
    {
        "movie_id": 965,
        "title_en": "What Happened to Mr. Cha?",
        "title_vn": "",
        "release_year": 2021,
        "recommendation_score": 0.8666666666666667,
        "reason": "Phim Hàn Quốc kết hợp yếu tố hài hước và chính kịch xoay quanh diễn viên Cha In Pyo, rất phù hợp với sở thích phim Hàn Quốc, Hài hước và Chính kịch của bạn."
    },
    {
        "movie_id": 766,
        "title_en": "Bad Trip",
        "title_vn": "",
        "release_year": 2021,
        "recommendation_score": 0.7766666666666666,
        "reason": "Phim thuộc thể loại hài hước về chuyến đi thực tế nhiều tình huống bất ngờ, phù hợp với sở thích xem phim Hài hước của bạn."
    },
]

  
![img.png](images/recommendation_movies.png)
