require('dotenv').config()
const express = require('express')
const sendEmail = require('./sendemail')
const { getAuthorizeUrl, getAccessToken } = require('./oauthplayground')
const rateLimit = require('express-rate-limit')
const PORT = process.env.PORT || 3000
const path = require('path')
const app = express()

// Enable if you're behind a reverse proxy
app.set('trust proxy', 1)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP. Please try again after 15 minutes.'
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '..', '/public')))
app.use('/send', limiter)


app.post('/authurl', (req, res) => {
  getAuthorizeUrl()
    .then((response) => {
      console.log(response)
      res.status(200).send(response)
    })
    .catch((error) => {
      console.log(error)
      res.status(400).send(error.message)
    })
})


app.post('/accesstoken', ({
  body: {
    code,
  } = req }, res, next) => {
  getAccessToken(code, next)
    .then((response) => {
      res.status(200).send(response)
    })
    .catch((error) => {
      res.status(400).send(error.message)
    })
})


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
      let msgObj = 'Email sent'
      let responseCode = 200
      if (error) {
        responseCode = 400
        msgObj = error.toString()
      }
      res.status(responseCode).send(msgObj)
    })
})

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})