# API LOGIN/ REGISTER DOCX
## Register
1. Mô tả:
- Đây là api dùng cho mục đích đăng ký

2. Endpoint - Method: POST /api/oauth/register/
3. Input/output data:
- Input:
{
    "username": "hongmai",
    "password": "HongMai123@",
    "email": "hongmai@gmail.com",
    "gender": "female",
    "date_of_birth": "2004-06-01",
    "preferences": {
        "preferred_release_year_from": 2015,
        "preferred_release_year_to": 2025,
        "genres": [1, 2],
        "countries": [1]
    }
}
- Output:
{
    "id": 2,
    "username": "hongmai",
    "email": "hongmai@gmail.com",
    "gender": "female",
    "date_of_birth": "2004-06-01T00:00:00Z",
    "avatar": null,
    "preferences": {
        "preferred_release_year_from": 2015,
        "preferred_release_year_to": 2025,
        "genres": [
            {
                "id": 1,
                "name": "Documentaries"
            },
            {
                "id": 2,
                "name": "Children & Family Movies"
            }
        ],
        "countries": [
            {
                "id": 1,
                "name": "United States"
            }
        ]
    }
}
![img_1.png](images/register_success.png)  -> Đăng ký thành công (201)
![img_2.png](images/register_fail.png) -> Đăng ký thất bại do tài khoản đã tồn tại (400)