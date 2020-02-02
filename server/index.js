require('dotenv').config()
const express = require('express')
const sendEmail = require('./sendemail')
const PORT = process.env.PORT || 3000
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', '/public')))

app.post('/send', async ({
  body: {
    to,
    from,
    subject,
    message,
  } = req }, res) => {
    return sendEmail({
      to,
      from,
      subject,
      text: message,
    }, (error) => {
      let msgObj = { message: 'Email sent' }
      let responseCode = 200
      if (error) {
        msgObj.message = 'Error sending email.'
        msgObj.details = error.toString()
        responseCode = 400
      }
      res.status(responseCode).send(msgObj)
    })
})

app.get('/getenv', (req, res) => {
  const dogBreed = process.env.DOG_BREED
  res.status(200).send({
    configvar: dogBreed,
  })
})

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})