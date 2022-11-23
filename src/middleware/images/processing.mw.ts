import express from 'express'
import sharp from 'sharp'
import path from 'path'
import { access } from 'fs'

const checkCache = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    const width = parseInt(req.query.width as string)
    const height = parseInt(req.query.height as string)
    const thumbname = path.join(
        __dirname,
        '../../..',
        'thumbs',
        `${req.query.filename as string}_${width}_${height}.jpg`
    )

    access(thumbname, (err) => {
        if (err != null) next()
        else res.sendFile(thumbname)
    })
}

const resize = (req: express.Request, res: express.Response): void => {
    const width = parseInt(req.query.width as string)
    const height = parseInt(req.query.height as string)
    const filename = path.join(
        __dirname,
        '../../..',
        'images',
        `${req.query.filename as string}.jpg`
    )
    const thumbname = path.join(
        __dirname,
        '../../..',
        'thumbs',
        `${req.query.filename as string}_${width}_${height}.jpg`
    )

    sharp(filename)
        .resize(width, height)
        .toFile(thumbname, (err) => {
            if (err != null) {
                res.status(500).send(
                    'Internal server error, please try again later'
                )
            } else res.sendFile(thumbname)
        })
}

export default { checkCache, resize }
