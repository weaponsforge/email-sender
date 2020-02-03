const googleAuth = require('google-auth-library')
const scope = 'https://mail.google.com/'

// EmailerNotifications Project
const credentials = {
  "web": {
    // Paste your OAuth 2.0 Client ID "credentials.json" file's content here
  },
}


// Initialize the OAuth2 client with your credentials
const oauth2Client = new googleAuth.OAuth2Client(
  credentials.web.client_id, 
  credentials.web.client_secret, 
  credentials.web.redirect_uris[0])


/**
 * Get authorization URL
 * @returns {String} authorization url
 */
const getAuthorizeUrl = async () => {
  const authUrl = await oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope,
  })

  return authUrl
}


/**
 * Generates the "accessToken" that can be used for OAuth handshakes.
 * Includes the "refreshToken" if its the first time allowing the app to access your account.
 * @param {String} code Code param obtained from the url returned by accessing 
 *    the authorization url and allowing your app to access your account
 */
const getAccessToken = (code) => {
  return new Promise((resolve) => {
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        resolve(err)
      }
      resolve(token)
    })
  })
}

module.exports = {
  getAuthorizeUrl,
  getAccessToken,
  oauthSetup,
}