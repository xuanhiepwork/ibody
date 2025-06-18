import express from 'express'

const router = express.Router()
router.use("/rpc", (await import('./rpc.js')).default)
router.use("/api", (await import('./api/index.js')).default)
router.use("/tim-chuyen-gia", (await import('./tim-chuyen-gia/index.js')).default)
router.use("/user", (await import('./user/index.js')).default)
router.use("/dang-ky-goi", (await import('./dang-ky-goi/index.js')).default)
router.use("/reset-password", (await import('./reset-password/index.js')).default)
router.use("/tracnghiem", (await import('./tracnghiem/index.js')).default)
router.use("/", (await import('./index.html/index.js')).default)

export default router