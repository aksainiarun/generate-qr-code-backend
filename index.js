const express = require('express')
const app = express()
const qrcode = require('qrcode')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server working properly')
})

app.get('/api/generate', (req, res) => {
  const {value} = req.query
  try {
    qrcode.toDataURL(value, {margin: 1 }, function (err, url) {
      res.status(200).send(url)
    })
  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
})
