import express from 'express'
import path from 'path'

const documentation = (req: express.Request, res: express.Response): void => {
    res.sendFile(path.join(__dirname, '../../..', 'index.html'))
}

export default { documentation }
