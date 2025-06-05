# ibody
uni project

# Setup project

### 0. Install prerequirements

```bash
bash script/init.sh
```

### 1. Install Nodejs:
[Download Node.js](https://nodejs.org/en/download)

### 2. Install required npm packages
```bash
npm i
```
### 3. Start server
```bash
npm start
```

# IBODY
Đồ án cơ sở

các gói package cần cài (BEBE) :
    dotnet add package Swashbuckle.AspNetCore
    # Entity Framework Core (nếu có dùng database)
    dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    dotnet add package Microsoft.EntityFrameworkCore.Tools
    dotnet add package Microsoft.EntityFrameworkCore.Design
    # Identity (nếu dùng xác thực)
    dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
    # Cài thư viện mã hóa mật khẩu
    dotnet add package BCrypt.Net-Next
    dotnet add package Microsoft.AspNetCore.SignalR.Core
    mongo
    dotnet add package Microsoft.AspNetCore.Authentication.Google



//Nếu chuyên gia đăng nhập với tài khoản bị khóa
const user = JSON.parse(localStorage.getItem("user"));
if (user.trangThai === "khoa") {
  alert("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
  window.location.href = "/";
}
