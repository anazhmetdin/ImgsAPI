import supertest from 'supertest'
import app from '../../../index'
import { stat, unlinkSync } from 'fs'
import path from 'path'
import sharp from 'sharp'

const request = supertest(app)

describe('Test processing.mw', () => {
    const thumbname = path.normalize(
        `${__dirname}/../../../../thumbs/fjord_400_400.jpg`
    )

    describe('Test resize middleware', () => {
        it('resizes the image successfully', async () => {
            // delete the processed image if exists
            try {
                unlinkSync(thumbname)
            } catch {}

            const response = await request.get(
                '/api/images?height=400&width=400&filename=fjord'
            )
            expect(response.status).toEqual(200)
        })

        it('produces image with correct dimensions', async () => {
            const image = sharp(thumbname)
            image.metadata((err, metadata) => {
                expect(metadata.width).toEqual(400)
                expect(metadata.height).toEqual(400)
            })
        })
    })

    describe('Test checkCache middleware', () => {
        it('sends cached image successfully', async () => {
            // check the stats of the old processed image
            stat(thumbname, async (err1, stats1) => {
                if (err1) {
                    throw err1
                } else {
                    // if the old processed image was found
                    // request the same image again
                    const response = await request.get(
                        '/api/images?height=400&width=400&filename=fjord'
                    )
                    expect(response.status).toEqual(200)

                    // check that the requested image wasn't modified after the second request
                    stat(thumbname, (err2, stat2) => {
                        expect(stats1.mtime).toEqual(stat2.mtime)
                    })
                }
            })
        })
    })
})
