const core = { ET: new EventTarget() }
{
    const re = /\s*([^=]+)(=([\S\s]*?))?(;|$)/g
    core.loadCookies = () => {
        const C = core.cookies = Object.create(null), cookie = document.cookie
        re.lastIndex = 0
        var m, v
        while (m = re.exec(cookie)) {
            v = m[3]
            C[m[1]] = v === "" ? true : v
        }
        return C
    }

    core.loadLocalStorage = () => {
        try { core.user = JSON.parse(localStorage.getItem("user")) } catch (e) { }
        if (!core.user) core.user = {}
        core.user_syncCode = localStorage.getItem("user_syncCode")
    }

    core.syncUser = async () => {
        const { user } = await (await fetch("/api/Auth/whoami")).json()
        core.loadCookies()

        if (user) { localStorage.setItem("user", JSON.stringify(user)) } else localStorage.removeItem("user")
        localStorage.setItem("user_syncCode", core.cookies?.user_syncCode || "")
        location.reload()
    }

    core.refresh = () => {
        core.loadCookies()
        core.loadLocalStorage()
        if (core.cookies?.user_syncCode != core.user_syncCode) {
            core.syncUser()
        }
    }

}

core.refresh()

{
    const rpcOptions = { method: "POST", headers: { 'Content-Type': 'application/json' } }
    core.rpc = () => {
        const options = Object.create(rpcOptions)
        options.body = JSON.stringify([...arguments])
        return fetch("/rpc", options).then((response) => response.json())
    }
}