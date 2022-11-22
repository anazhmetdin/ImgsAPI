import { Router } from 'express'
import helloWorld from '../middleware/imgsprocessing'

const imgsRoutes = Router()

imgsRoutes.get('/images', helloWorld)

export default imgsRoutes
