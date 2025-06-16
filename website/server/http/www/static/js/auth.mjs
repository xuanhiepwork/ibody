export async function loginByEmailPassword(email, password) {
    const response = await fetch("/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    if (response.ok) {
        const result = await response.json();
        if (result.code === "login-success") {
            var whoami = await (await fetch("/api/Auth/whoami")).text()
            localStorage.setItem("whoami", whoami)
            whoami = JSON.parse(whoami)
            console.log("USER LOGGED IN:", whoami);

            // Kiểm tra quyền và chuyển hướng
            const { user } = whoami
            console.log("→ Chuẩn bị redirect... user.roles = ", user.roles);
            if (Array.isArray(user.roles)) {
                if (user.roles.includes("quan_tri")) {
                    setTimeout(() => {
                        window.location.replace("/Admin/admin-dashboard.html");
                    }, 100);
                } else if (user.roles.includes("chuyen_gia")) {
                    setTimeout(() => {
                        window.location.replace("/chuyenGia/IndexChuyenGia.html");
                    }, 100);
                } else {
                    window.location.replace("/");
                }
            }

        }
        else {
            // #TODO: build giao diện cho khúc này
            alert("Đăng nhập thất bại!")
        }

    }
}
