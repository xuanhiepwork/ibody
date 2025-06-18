import express from 'express'

const router = express.Router()
router.use("/tin-nhan-user", (await import('./tin-nhan-user/index.js')).default)
router.use("/lich-hen-user", (await import('./lich-hen-user/index.js')).default)
router.use("/lich-su-goi", (await import('./lich-su-goi/index.js')).default)
router.use("/dang-ky-goi", (await import('./dang-ky-goi/index.js')).default)
router.use("/become-expert", (await import('./become-expert/index.js')).default)
router.use("/ho-tro-user", (await import('./ho-tro-user/index.js')).default)


export default router