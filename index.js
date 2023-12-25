const express = require('express')
const app = express()
const qrcode = require('qrcode')
const cors = require('cors')
var dataURLtoBlob = require('dataurl-to-blob')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('Server working properly')
})

app.get('/api/generate',  async(req, res) => {
  const { value } = req.query
  console.log(value)
  try {
     // Get the text or data for the QR code (you can modify this based on your needs)    

    // Generate the QR code
    const qrCodeDataURL = await qrcode.toDataURL(value, {
      margin: 1,
      
    });

    // Set headers to indicate the response is an image
    res.setHeader('Content-Type', 'image/png');

    // Convert the base64 image to a buffer and send it as the response
    res.send(Buffer.from(qrCodeDataURL.split(',')[1], 'base64'));


  } catch (error) {
    res.status(500).json({ error: true, message: error })
  }
})
