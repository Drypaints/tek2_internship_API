import { Router } from 'express'
import { hello } from './controller'

const router = new Router()

/**
 * @api {get} /blob Prompt hello world
 * @apiName Prompt hello world
 * @apiGroup Blob
 * @apiSuccess {Object[]} agencies List of agencies.
 */
router.get('/', hello)

export default router
