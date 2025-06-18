import query from "core/connector/mysql.js"
import { insertOrUpdate } from "../helper/sqlBuilder.js"


export default {
    sql() {
        return query(`show databases;`)
    },

    perm(ctx, name) {
        return query(`INSERT INTO userPermission(id, name) VALUES (NULL, '${name}');`)
    },

    async initData(ctx) {
        await ctx.exec("UserGroup", "insertOrUpdate", { code: "baseuser", name: "Người dùng" })
        const groupBaseuser = await ctx.exec("UserGroup", "getOne", { code: "baseuser" })
        await ctx.exec("UserGroup", "insertOrUpdate", { code: "admin", name: "Quản trị viên", parentId: groupBaseuser.id })
        const groupAdmin = await ctx.exec("UserGroup", "getOne", { code: "admin" })
        await ctx.exec("UserGroup", "insertOrUpdate", { code: "experd", name: "Chuyên gia", parentId: groupBaseuser.id })
        const groupExperd = await ctx.exec("UserGroup", "getOne", { code: "experd" })
        await ctx.exec("UserGroup", "insertOrUpdate", { code: "normal", name: "Người dùng thông thường", parentId: groupBaseuser.id })
        const groupNormalUser = await ctx.exec("UserGroup", "getOne", { code: "normal" })

        await ctx.exec("User", "insertOrUpdate", {
            name: "admin",
            email: "admin@ibody.com",
            fullname: "Administrator",
            roleId: groupAdmin.id,
        })
        const admin = await ctx.exec("User", "getOne", { name: "admin" })
        await ctx.exec("UserAuthPassword", "setPassword", admin.id, "abc")

        await ctx.exec("UserGroup", "addUser", groupAdmin.name, admin.name)
        await ctx.exec("UserGroup", "addUser", groupExperd.name, admin.name)

        await ctx.exec("User", "getAllGroupsOfUserId", admin.id)


        const specialties = [
            { id: 1, name: "Tâm lý học đường" },
            { id: 2, name: "Tư vấn Hôn nhân" },
            { id: 3, name: "Tư vấn hướng nghiệp" },
            { id: 4, name: "Rối loạn lo âu" },
            { id: 5, name: "Stress" },
            { id: 6, name: "Mâu thuẫn gia đình" },
            { id: 7, name: "Nuôi dạy con cái" },
            { id: 8, name: "Phát triển bản thân" },
            { id: 9, name: "Kỹ năng mềm" },
            { id: 10, name: "Ám ảnh sợ hãi" },
            { id: 11, name: "Trầm cảm" },
            { id: 12, name: "Rối loạn cảm xúc" },
            { id: 13, name: "Tư vấn cá nhân" },
            { id: 14, name: "Kỹ năng xã hội" },
        ]
        specialties.forEach(async s => {
            await ctx.exec("ExpertSpecialty", "insertOrUpdate", s)
        })


        const mockExperts = [
            { id: 1, name: "Nguyễn Thị Lan Anh", avatarUrl: "/static/img/HoangNhuQuynh.png", specialtyId: 1, specialties: [1, 4, 5], rating: 4.9 },
            {
                id: 2, name: "Trần Minh Đức", avatarUrl: "https://media.licdn.com/dms/image/v2/D5603AQEXqOp4DDLoEw/profile-displayphoto-shrink_800_800/B56ZSNP0gjHoAc-/0/1737536523054?e=1753920000&v=beta&t=_hOIPzbzw7qg_EciMC9hG29sx6aGyJJGvuzwZ14fVoE",
                specialtyId: 11, specialties: [11, 12, 13], rating: 4.8
            },
            { id: 3, name: "Lê Minh Nguyệt", avatarUrl: "/static/img/MinhNguyet.png", specialtyId: 2, specialties: [2, 6, 7], rating: 4.9 },
            { id: 4, name: "Phạm Quang Huy", avatarUrl: "https://i.pravatar.cc/150?u=expert4", specialtyId: 3, specialties: [3, 8, 9], rating: 4.7 },
            { id: 5, name: "Vũ Thị Mai", avatarUrl: "https://i.pravatar.cc/150?u=expert5", specialtyId: 4, specialties: [4, 10, 5], rating: 4.8 },
            { id: 6, name: "Nguyễn Thị Lan Anh", avatarUrl: "https://i.pravatar.cc/150?u=expert1", specialtyId: 1, specialties: [1, 4, 5], rating: 4.9 },
            { id: 7, name: "Trần Minh Đức", avatarUrl: "https://i.pravatar.cc/150?u=expert2", specialtyId: 11, specialties: [11, 12, 13], rating: 4.8 },
            { id: 8, name: "Lê Minh Nguyệt", avatarUrl: "https://i.pravatar.cc/150?u=expert3", specialtyId: 2, specialties: [2, 6, 7], rating: 4.9 },
            { id: 9, name: "Phạm Quang Huy", avatarUrl: "https://i.pravatar.cc/150?u=expert4", specialtyId: 3, specialties: [3, 8, 9], rating: 4.7 },
            { id: 10, name: "Vũ Thị Mai", avatarUrl: "https://i.pravatar.cc/150?u=expert5", specialtyId: 4, specialties: [4, 10, 5], rating: 4.8 },
            { id: 11, name: "Nguyễn Thị Lan Anh", avatarUrl: "https://i.pravatar.cc/150?u=expert1", specialtyId: 1, specialties: [1, 4, 5], rating: 4.9 },
            { id: 12, name: "Trần Minh Đức", avatarUrl: "https://i.pravatar.cc/150?u=expert2", specialtyId: 11, specialties: [11, 12, 13], rating: 4.8 },
            { id: 13, name: "Lê Minh Nguyệt", avatarUrl: "https://i.pravatar.cc/150?u=expert3", specialtyId: 2, specialties: [2, 6, 7], rating: 4.9 },
            { id: 14, name: "Phạm Quang Huy", avatarUrl: "https://i.pravatar.cc/150?u=expert4", specialtyId: 3, specialties: [3, 8, 9], rating: 4.7 },
            { id: 15, name: "Vũ Thị Mai", avatarUrl: "https://i.pravatar.cc/150?u=expert5", specialtyId: 4, specialties: [4, 10, 5], rating: 4.8 },
            { id: 16, name: "Nguyễn Thị Lan Anh", avatarUrl: "https://i.pravatar.cc/150?u=expert1", specialtyId: 1, specialties: [1, 4, 5], rating: 4.9 },
            { id: 17, name: "Trần Minh Đức", avatarUrl: "https://i.pravatar.cc/150?u=expert2", specialtyId: 11, specialties: [11, 12, 13], rating: 4.8 },
            { id: 18, name: "Lê Minh Nguyệt", avatarUrl: "https://i.pravatar.cc/150?u=expert3", specialtyId: 2, specialties: [2, 6, 7], rating: 4.9 },
            { id: 19, name: "Phạm Quang Huy", avatarUrl: "https://i.pravatar.cc/150?u=expert4", specialtyId: 3, specialties: [3, 8, 9], rating: 4.7 },
            { id: 20, name: "Vũ Thị Mai", avatarUrl: "https://i.pravatar.cc/150?u=expert5", specialtyId: 4, specialties: [4, 10, 5], rating: 4.8 },
        ]
        mockExperts.forEach(async e => {
            let data = { ...e }
            let specialties = data.specialties
            delete data.specialties
            await ctx.exec("Expert", "insertOrUpdate", data)

            console.log("specialties", specialties);
            
            specialties.forEach(async sid => {
                await query(insertOrUpdate("Expert_Specialty", {
                    specialtyId: sid,
                    expertId: e.id,
                }))
            })
        })


    },

    async userGetById(ctx, id) {
        return await ctx.exec("User", "getById", id)
    }
}