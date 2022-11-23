import { Router } from 'express'
import api from '../middleware/documentation/index.mw'
import endpoints from '../middleware/documentation/endpoints/index.mw'

const apiRoutes = Router()

apiRoutes.get('/', api.documentation)
apiRoutes.get('/api', endpoints.list)

export default apiRoutes
