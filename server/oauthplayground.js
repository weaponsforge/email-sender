const { google } = require('googleapis');
const scope = 'https://mail.google.com/'


// Initialize the OAuth2 client with your credentials
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI)


/**
 * Get authorization URL
 * @returns {String} authorization url
 */
const getAuthorizeUrl = async () => {
  if (process.env.NODE_ENV === 'production') {
    return new Promise(() => {
      throw new Error('Access Token will not be generated on production.')
    })
  } else {
    const authUrl = await oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope,
    })

    return authUrl
  }
}


/**
 * Generates the "accessToken" that can be used for OAuth handshakes.
 * Includes the "refreshToken" if its the first time allowing the app to access your account.
 * @param {String} code Code param obtained from the url returned by accessing 
 *    the authorization url and allowing your app to access your account
 */
const getAccessToken = async (code) => {
  if (process.env.NODE_ENV === 'production') {
    return new Promise(() => {
      throw new Error('Access Token will not be generated on production.')
    })
  } else {
    return new Promise((resolve, reject) => {
      oauth2Client.getToken(code, (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      })
    })
  }
}

module.exports = {
  getAuthorizeUrl,
  getAccessToken,
}