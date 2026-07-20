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


## LOGIN
1. Mô tả:
- Đây là api dùng cho mục đích đăng nhập

2. Endpoint - Method: POST /api/oauth/login/
3. Input/output data:
- Input:
{
    "username":"hongmai",
    "password":"HongMai123@"
}
- Output:
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg0NDcyNjQ1LCJpYXQiOjE3ODQ0NzIzNDUsImp0aSI6ImU0NDA1MzAyMDMyNzQyNWFhOThmMGY4NDA3NDljNTU2IiwidXNlcl9pZCI6IjIifQ.KhEOibVb9fL1jYec4LZ9wvyI5dJ5_scqmgWb2DcOAeo",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NDU1ODc0NSwiaWF0IjoxNzg0NDcyMzQ1LCJqdGkiOiJhYWJjZGU0OWFjN2Q0ZGJkOGI5YmNmNGZlYTEzMGI1YyIsInVzZXJfaWQiOiIyIn0.eepnYYtkD4Bfcdf9aPVxVnTQlYGGUlX_ZyhQvSycDG8",
    "token_type": "Bearer",
    "expires": 3600
}
![img_3.png](images/login_success.png) -> Đăng nhập thành công (200)


## REFRESH TOKEN
1. Mô tả:
- Đây là api dùng cho mục đích tạo lại token đăng nhập

2. Endpoint - Method: POST /api/oauth/refresh/
3. Input/output data:
- Input: refresh lấy từ output của đăng nhập
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4NDY0NjM0NSwiaWF0IjoxNzg0NTU5OTQ1LCJqdGkiOiI4ZWRjMDk4MjdmNDY0NzZkOTc0YzBiOTM1ZmQ5Mjg0MSIsInVzZXJfaWQiOiIyIn0.dm2QdSrM5fn0aCpOFOciAxLuYW-7YFQuhLtHkxDRvqk"
}
- Output:
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzg0NTYwMzIwLCJpYXQiOjE3ODQ1NjAwMjAsImp0aSI6IjE5ODc3MzZlMTMzMjQ5Yjc5M2VhODkxODY3NmQ5MWYxIiwidXNlcl9pZCI6IjIifQ.OOTyBEAQX1SkcaCX4rdZGLkBJ7fQaCX2dbbRoDY_WfI"
}

![img_4.png](images/refresh_token.png) 

