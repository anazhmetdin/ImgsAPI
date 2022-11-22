import express from 'express'
import sharp from 'sharp'
import path from 'path'
import { access } from 'fs'
import e from 'express'

const checkCache = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    const width = parseInt(<string>req.query.width)
    const height = parseInt(<string>req.query.height)
    const thumbname = path.normalize(
        `${__dirname}/../../../thumbs/${req.query.filename}_${width}_${height}.jpg`
    )

    access(thumbname, (err) => {
        if (err) next()
        else res.sendFile(thumbname)
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
    const thumbname = path.normalize(
        `${__dirname}/../../../thumbs/${req.query.filename}_${width}_${height}.jpg`
    )

    sharp(filename)
        .resize(width, height)
        .toFile(thumbname, (err) => {
            if (err)
                res.status(500).send(
                    'Internal server error, please try again later'
                )
            else res.sendFile(thumbname)
        })
}

export default { checkCache, resize }
