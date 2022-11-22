import express from 'express'

const helloWorld = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    res.send('Hello world')
    next()
}

export default helloWorld
