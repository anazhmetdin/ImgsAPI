import express from 'express'

const usage = async (
    req: express.Request,
    res: express.Response,
    next: Function
) => {
    if (Object.keys(req.query).length === 0) {
        res.send(
            `<!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>images/</title>
                </head>
                <body>
                    <h1> images/ </h1>
                    <h2> list of query paramaters: </h2>
                    <ul style="font-size:2rem">
                        <li>
                            filename: [check <a href="https://github.com/anazhmetdin/ImgsAPI/tree/main/images">images</a>
                            to get list of available images]
                        </li>
                        <li> width: positive integer </li>
                        <li> height: positive integer </li>
                    </ul>
                    <p style="font-size:2rem">
                        Example:<br>
                        <a href="?width=500&height=400&filename=fjord"> width=500&height=400&filename=fjord </a>
                    <p>
                    <br>
                    <br>
                    <a href="../">API endpoints</a>
                </body>
            </html>`
        )
    } else next()
}

export default { usage }
