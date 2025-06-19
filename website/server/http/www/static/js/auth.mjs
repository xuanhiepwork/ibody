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
            await ctx.syncUser()
            location.reload()
        }
        else {
            // #TODO: build giao diện cho khúc này
            alert("Đăng nhập thất bại!")
        }

    }
}

export async function logout() {
    await fetch("/api/Auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
    await ctx.syncUser()
    location.reload()
}
