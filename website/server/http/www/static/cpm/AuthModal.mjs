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
            <input type="email" name="email" placeholder="Email" autocomplete="email" required />
            <input type="password" name="password" autocomplete="password" placeholder="Mật khẩu" required />
            <a href="/reset-password" class="forgot-password">Quên mật khẩu?</a>
            <button type="submit">Đăng nhập</button>
        </form>
        <form name="registerForm" class="form">
            <h2>Đăng ký</h2>
            <input name="fullName" type="text" placeholder="Họ tên" required />
            <div name="email-error"></div>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Mật khẩu" required />
            <input name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" required />
            <button type="submit">Tạo tài khoản</button>
        </form>
    </div>
</div>`
const modal = base.firstElementChild,
    closeBtn = modal.querySelector('[name=close-btn]'),
    loginForm = modal.querySelector('[name=loginForm]'),
    registerForm = modal.querySelector('[name=registerForm]'),
    loginToggle = modal.querySelector('[name=loginToggle]'),
    registerToggle = modal.querySelector('[name=registerToggle]'),
    emailErrElm = modal.querySelector('[name=email-error]')

closeBtn.addEventListener("click", () => close())
// Ẩn modal khi bấm ra ngoài form
modal.addEventListener('onmousedown', function (e) { if (e.target === this) close() });
modal.addEventListener('pointerdown', function (e) { if (e.target === this) close() });

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

registerForm.getData = function () { return Object.fromEntries(new FormData(this).entries()) }

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    emailErrElm.innerHTML = ""

    const data = this.getData()
    if (data.password !== data.confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
    }

    try {
        const response = await fetch("/api/Auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            if (!result.error) return auth.loginByEmailPassword(data.email, data.password)

            if (result.code = "ER_DUP_ENTRY") {
                emailErrElm.innerHTML = "Email đã tồn tại."
            }
            else {
                emailErrElm.innerHTML = result.error
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
