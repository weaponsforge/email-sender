const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL, 
)

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

/**
 * Get access Token using a Google Service Account
 */
const authorize = async () => {
  // Load scopes
  const scopes = 'https://www.googleapis.com/auth/gmail.send'

  return new Promise((resolve) => {
    const jwt = new google.auth.JWT(process.env.GA_CLIENT_EMAIL, null, process.env.GA_PRIVATE_KEY, scopes)
    jwt.authorize((err, response) => {
      if (err) {
        resolve(false)
      }
      resolve(response.access_token)
    })
  })
}


/**
 * Send email using gmail OAuth
 * @param {Object} data Email data: { to, from, message, subject } 
 * @param {*} next 
 */
const sendEmail = async (data, next) => {
  const { token } = await oauth2Client.getAccessToken()
  const newData = {
    ...data,
    from: data.from || process.env.EMAIL,
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.CLIENT_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: token,
    }
  })
  
  transporter.sendMail(newData, next)
}

module.exports = { sendEmail }
