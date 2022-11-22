import express from 'express'
import { access } from 'fs'
import path from 'path'

const helloWorld = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    res.send('Hello world')
    next()
}

const paramsExist = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    if (
        !(
            'filename' in req.query &&
            'width' in req.query &&
            'height' in req.query
        )
    ) {
        res.status(400).send(
            'wrong parameters, must include filename & width & height'
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
    }
    if (isNaN(height) || height <= 0) {
        res.status(400).send('invalid height value, must be a positive number')
    }
    if (filename == '') {
        res.status(400).send(
            'invalid filename value, must be a non-empty srting'
        )
    }

    next()
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

        next()
    })
}

export default { helloWorld, checkFile, paramsExist, checkParamsValues }
