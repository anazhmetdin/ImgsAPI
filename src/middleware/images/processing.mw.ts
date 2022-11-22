import express from 'express'
import sharp from 'sharp'
import path from 'path'
import { access } from 'fs'

const checkCache = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    const width = parseInt(<string>req.query.width)
    const height = parseInt(<string>req.query.height)
    const thumpname = path.normalize(
        `${__dirname}/../../../thumps/${req.query.filename}_${width}_${height}.jpg`
    )

    access(thumpname, (err) => {
        if (err) next()

        res.sendFile(thumpname)
    })
}

const resize = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    const width = parseInt(<string>req.query.width)
    const height = parseInt(<string>req.query.height)
    const filename = path.normalize(
        `${__dirname}/../../../images/${<string>req.query.filename}.jpg`
    )
    const thumpname = path.normalize(
        `${__dirname}/../../../thumps/${req.query.filename}_${width}_${height}.jpg`
    )

    sharp(filename)
        .resize(width, height)
        .toFile(thumpname, (err) => {
            if (err)
                res.status(500).send(
                    'Internal server error, please try again later'
                )
            else res.sendFile(thumpname)
        })
}

export default { checkCache, resize }
