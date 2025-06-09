import query from "core/connector/mysql.js"
import * as sqlBuilder from 'core/helper/sqlBuilder.js'

import UserPermission from './UserPermission.js'
import UserGroup from './UserGroup.js'
import User from './User.js'


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


        User.setRole(ctx, "testuser", "baseUser")
        UserGroup.addUser(ctx, "base1", "testuser")

        //     name: "admin",
        //     email: "admin@ibody.com",
        //     fullname: "Administrator",
        // }
        // await ctx.call("User", "insertOrUpdate", adminObj)

        // const admin = await ctx.call("User", "userGetById", adminObj.name)

        // return admin
    }
}
