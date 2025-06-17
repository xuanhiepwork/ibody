import query from "core/connector/mysql.js"
import { processWhere } from "core/helper/sqlBuilder.js"
import instantSqlTable from './sqlBaseTable.js'

export default instantSqlTable({
    tableName: "Expert",

    async list(ctx, { keyword, specialtyId }) {

        var where = ""
        if (keyword) where += `(e.name LIKE "%${keyword}%" OR sp.name LIKE "%${keyword}%" OR e_sp.specialties LIKE "%${keyword}%" )`
        if (keyword && specialtyId) where += " AND "
        if (specialtyId) where += `(e.specialtyId=${specialtyId} OR e_sp.specialties LIKE '"id":${specialtyId}' )`
        if (where.length > 0) where = "WHERE " + where

        return query(`WITH
e AS ( SELECT * FROM Expert ),
e_sp AS (
    SELECT expertId, JSON_ARRAYAGG(JSON_OBJECT("id", id, "name", name)) AS specialties
    FROM (
        SELECT * FROM Expert_Specialty WHERE expertId IN ( SELECT id FROM e )
    ) e_s
    LEFT JOIN ExpertSpecialty es ON e_s.specialtyId = es.id
    GROUP BY expertId
)

SELECT e.*, sp.name as specialty, e_sp.specialties
FROM e
LEFT JOIN ExpertSpecialty sp ON sp.id = e.specialtyId
LEFT JOIN e_sp ON e_sp.expertId = e.id
${where};`)
    },

})
