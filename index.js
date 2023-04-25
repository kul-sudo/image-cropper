import express from 'express'
import sharp from 'sharp'
import got from 'got'

const PORT = 3000

const app = express()

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
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

