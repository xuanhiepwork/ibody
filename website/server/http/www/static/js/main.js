const ctx = { ET: new EventTarget() }
{
    const re = /\s*([^=]+)(=([\S\s]*?))?(;|$)/g
    ctx.loadCookies = () => {
        const C = ctx.cookies = Object.create(null), cookie = document.cookie
        re.lastIndex = 0
        var m, v
        while (m = re.exec(cookie)) {
            v = m[3]
            C[m[1]] = v === "" ? true : v
        }
        return C
    }

    ctx.loadLocalStorage = () => {
        try { ctx.user = JSON.parse(localStorage.getItem("user")) } catch (e) { }
        if (!ctx.user) ctx.user = {}
        ctx.user_syncCode = localStorage.getItem("user_syncCode")
    }

    ctx.syncUser = async () => {
        const { user } = await (await fetch("/api/Auth/whoami")).json()
        ctx.loadCookies()

        if (user) { localStorage.setItem("user", JSON.stringify(user)) } else localStorage.removeItem("user")
        localStorage.setItem("user_syncCode", ctx.cookies?.user_syncCode || "")
        // location.reload()
    }

    ctx.refresh = () => {
        ctx.loadCookies()
        ctx.loadLocalStorage()
        if (ctx.cookies?.user_syncCode != ctx.user_syncCode) {
            ctx.syncUser()
        }
    }

    const rpcOptions = { method: "POST", headers: { 'Content-Type': 'application/json' } }
    ctx.call = function () {
        const options = Object.create(rpcOptions)
        options.body = JSON.stringify([...arguments])
        return fetch("/rpc", options).then((response) => response.json())
    }

}

ctx.refresh()
