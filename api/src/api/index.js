import { Router } from 'express'
import Blob from './blob'

const router = Router()

router.use('/blobs', Blob)


export default router
