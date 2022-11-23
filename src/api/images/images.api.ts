import { Router } from 'express'
import imgDoc from '../../middleware/documentation/endpoints/images.mw'
import img from '../../middleware/images/images.mw'
import sharp from '../../middleware/images/processing.mw'

const imgsRoutes = Router()

imgsRoutes.get(
    '/images',
    imgDoc.usage,
    img.paramsExist,
    img.checkParamsValues,
    img.checkFile,
    sharp.checkCache,
    sharp.resize
)

export default imgsRoutes
