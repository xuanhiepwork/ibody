{
    const base = document.createElement("div")
    const userMenu = base.firstElementChild
    window.userMenu = userMenu

    base.innerHTML = `<div name="modal" class="modal-overlay">
    <div class="auth-modal">
        <button class="close-btn" onclick="AuthModal.close()">×</button>
        <div class="form-toggle">
        <button name="loginToggle" class="active">Đăng nhập</button>
        <button name="registerToggle">Đăng ký</button>
        <button onclick="window.location.href='/api/auth/google-login'" class="google-login-btn">
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" class="google-icon" />
            <!-- <span>Đăng nhập bằng Google</span> -->
        </button>
        </div>
        <form name="loginForm" class="form active">
        <h2>Đăng nhập</h2>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Mật khẩu" required />
        <a href="/reset-password" class="forgot-password">Quên mật khẩu?</a>
        <button type="submit">Đăng nhập</button>
        </form>
        <form name="registerForm" class="form">
        <h2>Đăng ký</h2>
        <input type="text" name="fullName" placeholder="Họ tên" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Mật khẩu" required />
        <input type="password" name="confirmPassword" placeholder="Xác nhận mật khẩu" required />
        <button type="submit">Tạo tài khoản</button>
        </form>
    </div>
    </div>`

    const modal = base.firstElementChild,
        loginForm = modal.querySelector('[name=loginForm]'),
        registerForm = modal.querySelector('[name=registerForm]'),
        loginToggle = modal.querySelector('[name=loginToggle]'),
        registerToggle = modal.querySelector('[name=registerToggle]')

    // Ẩn modal khi bấm ra ngoài form
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            AuthModal.close();
        }
    });

    loginToggle.onclick = () => {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    };

    registerToggle.onclick = () => {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
    };

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/Auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    email: loginForm.email.value,
                    password: loginForm.password.value
                })
            });

            const result = await response.json();
            if (response.ok) {
                const user = result.user;
                console.log("USER LOGGED IN:", user);
                localStorage.setItem("user", JSON.stringify(user));

                // Kiểm tra quyền và chuyển hướng
                console.log("→ Chuẩn bị redirect... user.roles = ", user.roles);
                if (Array.isArray(user.roles)) {
                    if (user.roles.includes("quan_tri")) {
                        console.log("✅ Quyền admin xác thực → chuyển trang admin");
                        setTimeout(() => {
                            window.location.replace("/Admin/admin-dashboard.html");
                        }, 100);
                    } else if (user.roles.includes("chuyen_gia")) {
                        console.log("✅ Quyền chuyên gia xác thực → chuyển trang chuyên gia");
                        setTimeout(() => {
                            window.location.replace("/chuyenGia/IndexChuyenGia.html");
                        }, 100);
                    } else {
                        console.log("👤 Quyền người dùng thông thường → về trang chủ");
                        window.location.replace("/");
                    }
                }
            }
        } catch (err) {
            console.error(err);
            alert("Không thể kết nối đến máy chủ.");
        }
    });

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const fullName = registerForm.fullName.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;
        const confirmPassword = registerForm.confirmPassword.value;

        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }

        const userData = {
            fullName,
            email,
            password,
            gender: null, // nếu sau này thêm select => lấy value ở đây
            dob: null     // nếu có input type="date" => lấy từ registerForm.dob.value
        };

        try {
            const response = await fetch("/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                // ✅ Sau khi đăng ký xong → tự động đăng nhập luôn
                const loginRes = await fetch("/api/Auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                const loginResult = await loginRes.json();

                if (loginRes.ok) {
                    localStorage.setItem("user", JSON.stringify(loginResult.user));
                    alert("Đăng ký & đăng nhập thành công!");
                    closeAuthModal();
                    window.location.href = "index.html";
                } else {
                    alert("Đăng ký thành công, nhưng tự động đăng nhập thất bại.");
                }
            } else {
                alert(result.message || "Đăng ký thất bại.");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi kết nối máy chủ.");
        }
    });

    window.AuthModal = {
        open() {
            modal.classList.add('active')
        },

        close() {
            modal.classList.remove('active');
        },

        logout() {
            localStorage.removeItem("user");
            alert("Đăng xuất thành công!");
            window.location.href = "/";
        }

    }

    window.addEventListener("DOMContentLoaded", () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const loginLink = document.getElementById("loginLink");
        const userMenu = document.getElementById("userMenu");
        const usernameDisplay = document.getElementById("usernameDisplay");

        const urlParams = new URLSearchParams(window.location.search);
        const googleUserParam = urlParams.get("googleUser");

        if (googleUserParam) {
            try {
                const userData = JSON.parse(decodeURIComponent(googleUserParam));

                // ✅ Chuẩn hóa để frontend tương thích (vai trò dạng mảng như roles = [...])
                const mappedUser = {
                    taiKhoanId: userData.userId,
                    email: userData.email,
                    fullName: userData.fullName || userData.email,
                    roles: [userData.role], // Gán thành mảng
                    avatarUrl: null,
                    trangThai: "hoat_dong"
                };

                localStorage.setItem("user", JSON.stringify(mappedUser));

                // ✅ Chuyển trang tùy vai trò
                if (mappedUser.roles.includes("chuyen_gia")) {
                    window.location.href = "/chuyenGia/indexChuyenGia.html";
                } else if (mappedUser.roles.includes("quan_tri")) {
                    window.location.href = "/Admin/admin-dashboard.html";
                } else {
                    window.location.href = "index.html";
                }
            } catch (err) {
                console.error("Lỗi giải mã user từ Google:", err);
            }
        }

        // ✅ Nếu người dùng đã đăng nhập từ trước
        if (user) {
            const loginLink = document.getElementById("loginLink");
            const usernameDisplay = document.getElementById("usernameDisplay");

            if (loginLink && userMenu && usernameDisplay) {
                loginLink.style.display = "none";
                userMenu.style.display = "inline-block";
                usernameDisplay.innerText = user.fullname || user.username;
            } else {
                userMenu.style.display = "none";
            }
        }
    });

    window.addEventListener("load", () => document.body.append(modal), { once: true })
}