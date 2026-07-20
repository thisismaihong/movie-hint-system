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

## Sửa thông tin người dùng
1. Mô tả:
- Đây là api dùng cho mục đích chỉnh sửa thông tin người dùng 

2. Endpoint - Method: 
- PATCH /api/oauth/profile
- PATCH /api/oauth/profile/change-password 

3. Input/output data:
- PATCH /api/oauth/profile
Trường được sửa: [first_name, last_name, avatar]
Input:
{
    "first_name":"Hồng"
}
![img_2.png](images/update_profile.png)

- PATCH /api/oauth/profile/change-password
(Yêu cầu đầu vào: old_password, new_password, confirm_password)


![img_3.png](images/change_password_1.png) -> Mật khẩu cũ chưa đúng 
![img_4.png](images/change_password_2.png) -> Mật khẩu mới không khớp 
![img_5.png](images/change_password_3.png) -> Mật khẩu mới giống cũ
![img_4.png](images/change_password.png) -> Đổi mật khẩu thành công



