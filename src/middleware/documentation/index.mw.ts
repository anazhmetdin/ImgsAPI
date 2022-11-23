import express from 'express'
import path from 'path'

const documentation = async (req: express.Request, res: express.Response) => {
    res.sendFile(path.normalize(`${__dirname}/../../../index.html`))
}

export default { documentation }
