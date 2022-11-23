import supertest from 'supertest'
import app from '../../../index'

const request = supertest(app)

describe('Test images api', () => {
    describe('Test images.mw', () => {
        describe('Test paramsExist middleware', () => {
            it('detects missing width param', async () => {
                const responseProminse = request.get(
                    '/api/images?height=400&filename=fjord'
                )

                responseProminse.catch((reason) => {})

                const response = await responseProminse
                expect(response.status).toEqual(400)
                expect(response.text.replace(/\s+/g, ' ')).toEqual(
                    `missing parameter, must include width<br>
                    Click <a href="?">here</a> to view usage`.replace(
                        /\s+/g,
                        ' '
                    )
                )
            })

            it('detects missing height param', async () => {
                const response = await request.get(
                    '/api/images?width=400&filename=fjord'
                )
                expect(response.status).toEqual(400)
                expect(response.text.replace(/\s+/g, ' ')).toEqual(
                    `missing parameter, must include height<br>
                    Click <a href="?">here</a> to view usage`.replace(
                        /\s+/g,
                        ' '
                    )
                )
            })

            it('detects missing filename param', async () => {
                const response = await request.get(
                    '/api/images?height=400&width=400'
                )
                expect(response.status).toEqual(400)
                expect(response.text.replace(/\s+/g, ' ')).toEqual(
                    `missing parameter, must include filename<br>
                    Click <a href="?">here</a> to view usage`.replace(
                        /\s+/g,
                        ' '
                    )
                )
            })

            it('detects extra params', async () => {
                const response = await request.get(
                    '/api/images?height=400&width=400&filename=fjord&extra'
                )
                expect(response.status).toEqual(400)
                expect(response.text.replace(/\s+/g, ' ')).toEqual(
                    `wrong parameters: must only include filename, width, heigth<br>
                    Click <a href="?">here</a> to view usage`.replace(
                        /\s+/g,
                        ' '
                    )
                )
            })
        })

        describe('Test checkParamsValues middleware', () => {
            it('detects invalid width values', async () => {
                const response = await request.get(
                    '/api/images?height=400&width=-400&filename=fjord'
                )
                expect(response.status).toEqual(400)
                expect(response.text).toEqual(
                    'invalid width value, must be a positive number'
                )
            })

            it('detects invalid height values', async () => {
                const response = await request.get(
                    '/api/images?height=0&width=300&filename=fjord'
                )
                expect(response.status).toEqual(400)
                expect(response.text).toEqual(
                    'invalid height value, must be a positive number'
                )
            })

            it('detects invalid filenmae values', async () => {
                const response = await request.get(
                    '/api/images?height=400&width=400&filename='
                )
                expect(response.status).toEqual(400)
                expect(response.text).toEqual(
                    'invalid filename value, must be a non-empty srting'
                )
            })
        })

        describe('Test checkFile middleware', () => {
            it('detects filenames that does not exist', async () => {
                const response = await request.get(
                    '/api/images?height=400&width=400&filename=fjordd'
                )
                expect(response.status).toEqual(404)
                expect(response.text).toEqual(
                    "The requested image doesn't exist or can't be access currently"
                )
            })
        })
    })
})
