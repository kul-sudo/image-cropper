import express from 'express'
import sharp from 'sharp'
import got from 'got'

const PORT = 3000

const app = express()

app.get('/', async (req, res) => {
  try {
    const { width, height, url } = req.query

    const imageBuffer = await got(url).buffer()

    const resizedImage = await sharp(imageBuffer)
      .resize({ width: Number(width) || null, height: Number(height) || null, fit: 'contain' })
      .toBuffer()

    res.end(resizedImage)
  } catch (error) {
    console.error(error)
    res.status(500).send('An error occurred.');
  }
})

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
