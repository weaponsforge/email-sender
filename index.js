const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.post('/send', ({ body: { title, message } = req }, res) => {
  console.log(`received: ${title}, ${message}`)
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})