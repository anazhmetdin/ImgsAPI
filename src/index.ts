import express from 'express'
import apiRoutes from './api/documentation'
import imgsRoutes from './api/images/images.api'

const app = express()

const port = process.env.PORT ?? 3000

app.listen(port, () => {
    console.log('Server listening on port', port)
})

app.use('/', apiRoutes)
app.use('/api', imgsRoutes)

export default app
