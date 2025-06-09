import query from "core/connector/mysql.js"
import * as sqlBuilder from 'core/helper/sqlBuilder.js'

import UserPermission from './UserPermission.js'
import UserGroup from './UserGroup.js'
import User from './User.js'
import UserAuthPassword from './UserAuthPassword.js'


export default {
    async init(ctx) {
        await UserPermission.insertOrUpdate(ctx, { name: "base" })
        await UserPermission.insertOrUpdate(ctx, { name: "base1" })
        await UserPermission.insertOrUpdate(ctx, { name: "base2" })

        await UserGroup.insertOrUpdate(ctx, { name: "anonymous" })
        await UserGroup.insertOrUpdate(ctx, { name: "baseUser" })
        await UserGroup.insertOrUpdate(ctx, { name: "admin" })
        await UserGroup.insertOrUpdate(ctx, { name: "superadmin" })

        await UserGroup.addPermission(ctx, "anonymous", "base")

        await User.insertOrUpdate(ctx, {
            name: "testuser",
            phoneNumber: 23135456,
            fullname: "test An Binh",
            email: "test@gmail.com"
        })


        await User.setRole(ctx, "testuser", "baseUser")
        await UserGroup.addUser(ctx, "baseUser", "testuser")

        const user = await User.getOne(ctx, {
            name: "testuser",
        })

        await UserAuthPassword.setPassword(ctx, user.id, "abc")

        const valiPass = await UserAuthPassword.validatePassword(ctx, user.id, "abc")
        console.log("valiPass", valiPass);
    }
}
