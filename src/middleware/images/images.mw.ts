import express from 'express'
import { access } from 'fs'
import path from 'path'

const paramsExist = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
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
    } else if (Object.keys(req.query).length != 3) {
        res.status(400).send(
            `wrong parameters: must only include filename, width, heigth<br>
            Click <a href="?">here</a> to view usage`
        )
    } else {
        next()
    }
}

const checkParamsValues = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    const width = parseInt(<string>req.query.width)
    const height = parseInt(<string>req.query.height)
    const filename = <string>req.query.filename

    if (isNaN(width) || width <= 0) {
        res.status(400).send('invalid width value, must be a positive number')
    } else if (isNaN(height) || height <= 0) {
        res.status(400).send('invalid height value, must be a positive number')
    } else if (filename == '') {
        res.status(400).send(
            'invalid filename value, must be a non-empty srting'
        )
    } else {
        next()
    }
}

const checkFile = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    const filename = path.normalize(
        `${__dirname}/../../../images/${<string>req.query.filename}.jpg`
    )

    access(filename, (err) => {
        if (err)
            res.status(404).send(
                "The requested image doesn't exist or can't be access currently"
            )
        else next()
    })
}

export default { checkFile, paramsExist, checkParamsValues }
