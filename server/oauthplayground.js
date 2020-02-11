const { google } = require('googleapis');
const scope = 'https://mail.google.com/'

// EmailerNotifications Project
const credentials = {
  "installed": {
    // Paste your OAuth 2.0 Client ID "credentials.json" file's content here
    "client_id": "---",
    "project_id": "---",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "---",
    "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
  },
}


// Initialize the OAuth2 client with your credentials
const oauth2Client = new google.auth.OAuth2(
  credentials.installed.client_id,
  credentials.installed.client_secret,
  credentials.installed.redirect_uris[0])


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