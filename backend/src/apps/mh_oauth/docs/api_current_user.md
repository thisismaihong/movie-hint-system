# API CURD CURRENT USER DOCX
## Xem thông tin người dùng
1. Mô tả:
- Đây là api dùng cho mục đích xem thông tin người dùng đang đăng nhập 

2. Endpoint - Method: GET /api/oauth/profile/
3. Input/output data:
- Output:
{
    "id": 2,
    "username": "hongmai",
    "first_name": "",
    "last_name": "",
    "email": "hongmai@gmail.com",
    "gender": "female",
    "date_of_birth": "2004-06-01T00:00:00Z",
    "role": "user",
    "date_joined": "2026-07-18T16:39:14.611885Z",
    "avatar": null,
    "status": "active"
}

![img_1.png](images/get_profile.png)-> Lấy thông tin người dùng đang đăng nhập thành công
