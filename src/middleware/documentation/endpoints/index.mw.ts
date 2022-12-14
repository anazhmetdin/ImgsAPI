import express from 'express'
import { readdir } from 'fs'
import path from 'path'

const list = (req: express.Request, res: express.Response): void => {
    readdir(
        path.join(__dirname, '../../..', 'api'),
        { withFileTypes: true },
        (err, files) => {
            if (err != null) {
                res.status(500)
                res.send('Internal server error, please try again later')
            } else {
                res.send(
                    `<!DOCTYPE html>
                  <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Endpoints List</title>
                  </head>
                  <body>
                      <h1> Endpoints List: </h1>
                      <ul style="font-size:2rem">
                          ${files
                              .filter((dirent) => dirent.isDirectory())
                              .map(
                                  (dirent) =>
                                      `<li><a href='${dirent.name}/'>${dirent.name}</a></li>`
                              )
                              .join('')}
                      </ul>
                      <br>
                      <br>
                      <a href="../">home</a>
                  </body>
                  </html>`
                )
            }
        }
    )
}

export default { list }
