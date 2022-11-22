import { Router } from 'express'
import img from '../../middleware/images/images.mw'
import sharp from '../../middleware/images/processing.mw'

const imgsRoutes = Router()

imgsRoutes.get('/', img.helloWorld)
imgsRoutes.get(
    '/images',
    img.paramsExist,
    img.checkParamsValues,
    img.checkFile,
    sharp.checkCache,
    sharp.resize
)

export default imgsRoutes
