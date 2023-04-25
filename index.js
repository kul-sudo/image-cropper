import express from 'express'
import sharp from 'sharp'
import got from 'got'
import { join, resolve } from 'path'

const PORT = 3000
const dirname = resolve()

const app = express()

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  res.sendFile(resolve(dirname, 'static', 'index.html'))
})

app.get("/:width/:height/:url(*)", async (req, res) => {
  try {
    const { width, height, url } = req.params

    const imageBuffer = await got(url).buffer()

    const resizedImage = await sharp(imageBuffer)
      .resize(Number(width), Number(height))
      .toBuffer()

    res.end(resizedImage)
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occurred.');
  }
})

