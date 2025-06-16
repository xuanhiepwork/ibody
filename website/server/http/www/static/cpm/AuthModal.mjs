import * as auth from '/static/js/auth.mjs'

const base = document.createElement("div")
base.innerHTML = `<div name="modal" class="modal-overlay">
    <div class="auth-modal">
        <button class="close-btn" name="close-btn">×</button>
        <div class="form-toggle">
            <button name="loginToggle" class="active">Đăng nhập</button>
            <button name="registerToggle">Đăng ký</button>
            <button onclick="window.location.href='/api/auth/google-login'" class="google-login-btn">
                <img src="/static/img/Google__G__logo.svg.png" class="google-icon" />
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
    closeBtn = modal.querySelector('[name=close-btn]'),
    loginForm = modal.querySelector('[name=loginForm]'),
    registerForm = modal.querySelector('[name=registerForm]'),
    loginToggle = modal.querySelector('[name=loginToggle]'),
    registerToggle = modal.querySelector('[name=registerToggle]')

closeBtn.addEventListener("click", () => close())
// Ẩn modal khi bấm ra ngoài form
modal.addEventListener('click', function (e) { if ( e.target === this) close() });

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
    auth.loginByEmailPassword(loginForm.email.value, loginForm.password.value)
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

document.body.append(modal)

export const open = () => modal.classList.add('active')
export const close = () => modal.classList.remove('active')
export const logout = () => auth.logout()
