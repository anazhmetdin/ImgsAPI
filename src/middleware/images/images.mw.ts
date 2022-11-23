import express from 'express'
import { access } from 'fs'
import path from 'path'

const paramsExist = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    if (!('width' in req.query)) {
        res.status(400).send(
            `missing parameter, must include width<br>
            Click <a href="?">here</a> to view usage`
        )
    } else if (!('height' in req.query)) {
        res.status(400).send(
            `missing parameter, must include height<br>
            Click <a href="?">here</a> to view usage`
        )
    } else if (!('filename' in req.query)) {
        res.status(400).send(
            `missing parameter, must include filename<br>
            Click <a href="?">here</a> to view usage`
        )
    } else if (Object.keys(req.query).length !== 3) {
        res.status(400).send(
            `wrong parameters: must only include filename, width, heigth<br>
            Click <a href="?">here</a> to view usage`
        )
    } else {
        next()
    }
}

const checkParamsValues = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    const width = parseInt(req.query.width as string)
    const height = parseInt(req.query.height as string)
    const filename = req.query.filename as string

    if (isNaN(width) || width <= 0) {
        res.status(400).send('invalid width value, must be a positive number')
    } else if (isNaN(height) || height <= 0) {
        res.status(400).send('invalid height value, must be a positive number')
    } else if (filename === '') {
        res.status(400).send(
            'invalid filename value, must be a non-empty srting'
        )
    } else {
        next()
    }
}

const checkFile = (
    req: express.Request,
    res: express.Response,
    next: Function
): void => {
    const filename = path.join(
        __dirname,
        '../../..',
        'images',
        `${req.query.filename as string}.jpg`
    )

    access(filename, (err) => {
        if (err !== null) {
            res.status(404).send(
                "The requested image doesn't exist or can't be access currently"
            )
        } else next()
    })
}

export default { checkFile, paramsExist, checkParamsValues }
