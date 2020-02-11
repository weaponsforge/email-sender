## email-sender

> Testing nodemailer with Google Gmail, SMTP and OAuth2 for sending emails.  
> Set-up OAuth 2.0 credentials (refresh token) from localhost.

### Prerequisites

1. Windows OS 64 bit
2. NodeJS: the following versions were used for this demo
	- **node**: 10.16.3
	- **npm**: 6.9.0
3. Gmail Account
	- [Google Cloud Platform](https://console.cloud.google.com/) project configured with OAuth2 settings and credentials
	- read on the [**Google Gmail, SMTP and OAuth2 Setup**]() sections for more information

### Content

- [**Installation**](#installation)
- [**Usage**](#usage)
- **Google Gmail, SMTP and OAuth2 Setup**
	- [**Using a Local OAuth 2.0 Generator**]()
	- [**Using the OAuth 2.0 Playground**]()
- [**References**](#references)


## Installation

1. Clone this repository.  
`git clone https://github.com/weaponsforge/email-sender.git`

2. Navigate into the project's root directory.

3. Install dependencies.  
`npm install`

4. Source out the `.env.example` file to a `.env` file. Fill in the information with *your own* Google account credentials:
	- **EMAIL, CLIENT_USER**: your google email that you've configure for SMTP and OAuth2
		- read on the [**Google Gmail, SMTP and OAuth2 Setup**](#google-gmail-smtp-and-oauth2-setup) section for more information
	- **CLIENT_ID**: Google Developer Project ID associated with your email
		- read on the [**Google Gmail, SMTP and OAuth2 Setup**](#google-gmail-smtp-and-oauth2-setup) section, **#3 - #4** for more information on how to obtain this
	- **CLIENT_SECRET**: Client secret for the Google Developer Project CLIENT\_ID
	- **REDIRECT_URL**: *https://developers.google.com/oauthplayground*
	- **REFRESH_TOKEN**:
		- The initial (or any) refresh token obtained from [oauthplayground](https://developers.google.com/oauthplayground) or the [local oauth 2.0 generator]()
		- read on [**Using a Local OAuth 2.0 Generator**]() section, **#7** for more information on the how to obtain this. 
			> Take note that  [**Using a Local OAuth 2.0 Generator**]() is the more recommended approach to obtain a refresh token, but you may also try [**Using the OAuth 2.0 Playground**]().


## Usage

1. Navigate into the project's root directory.

2. Start the server.  
`npm run start`

2. Build the jsx React components.  
`npm run build`

3. Load the app on: `http://localhost:3000`.

4. Create new **jsx** components or edit existing from **/src/\*.js**.  
   - `npm run watch`
   - refresh the website `http://localhost:3000`



## Using a Local OAuth 2.0 Generator

The following methods are the more recommended approach to generate a **refresh token** since its steps are reproducible from your own server. You may also check out the previous-endorsed methods on [**Using the OAuth 2.0 Playground**]().

1. Create Project from the [Google Developer Console](https://console.cloud.google.com/). Use any project name.

2. Configure the **OAuth Consent Screen**
   - press the **Configure consent screen** button
   - do not select anything for **User Type**
   - Enter a value for **Application name**
   - Save

3. Press **Credentials** tab in the sidebar
   - Press the **+CREATE CREDENTIALS** button
   - select **OAuth client ID**
   - select **Other** for the type option. Fill in the following:
      - **Name**: *(any name for your project)*
      - **Authorized redirect URIs**: http://localhost:3000 *(or any domain of your that you own)*
   - press **Create**

4. Save your **Client ID** and **Client Secret**. Download the JSON file that contains your full security credentials.

5. Refer to `/server/oauthplayground.js` for more information on the actual **googleapis** code usage and set-up.
	- Copy and paste the content of your JSON file credentials under the line with:  
`// Paste your OAuth 2.0 Client ID "credentials.json" file's content here`

6. Start the local server.  
`npm run start`

7. Configure **OAuth**. Get the refresh token.
	- Load `http://localhost:3000/oauthplayground`
	- Press the **Get Auth URL button**.
		- Launch the generated URL to another browser tab
		- Login your gmail account
		- You will be taken to a page that says "This app isn't verified"
		- press the **Advanced** link on the bottom left
      - press the link **Go to Your App’s Name (unsafe)**
      - A pop-up box that says "Grant App Name permission" will appear
         - select **Allow**
         - Copy and paste the `code` that will be displayed back to `http://localhost:3000/oauthplayground's` **code** field that says "Enter code here".
       - Press the 	**Get Access Token** button.
     - Copy the `refresh_token` that will be displayed in the Chrom dev console to your **.env** variable.



## Using the OAuth 2.0 Playground

The following methods generates a **refresh token** using the [https://developers.google.com/oauthplayground](https://developers.google.com/oauthplayground).

1. Create Project from the [Google Developer Console](https://console.cloud.google.com/). Use any project name.

2. Configure the **OAuth Consent Screen**
   - press the **Configure consent screen** button
   - do not select anything for **User Type**
   - Enter a value for **Application name**
   - Save

3. Press **Credentials** tab in the sidebar
   - Press the **+CREATE CREDENTIALS** button
   - select **OAuth client ID**
   - select **Web application**. Fill in the following:
      - **Name**: *(any name for your project)*
      - **Authorized redirect URIs**: https://developers.google.com/oauthplayground
   - press **Create**

4. Save your **Client ID** and **Client Secret**.

5. Configure **OAuth**. Get the refresh token.
   - Go to [https://developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)
   - click the tools icon on the top right
   - check the box that says **Use your own OAuth credentials**
      - enter your OAuth **Client ID** and **Secret**
   - Do not close the tool box from previous step yet
      - enter `https://mail.google.com/` in the input field under **Select & authorize APIs**
      - press the **Authorize APIs** button
      - Login your gmail account
      - You will be taken to a page that says "This app isn't verified"
      - press the **Advanced** link on the bottom left
      - press the link **Go to Your App’s Name (unsafe)**
      - A pop-up box that says "Grant App Name permission" will appear
         - select **Allow**
         - you will be taken back to the OAuth page
    - Go to "Step 2: Exchange authorization code for tokens" from the side bar
       - press the **Exchange authorization code for tokens** button
    - Copy the **Refresh Token**


## References

[[1]](https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1) - sending email with nodejs using smtp, gmail and oauth2  
[[2]](https://designdigitalsolutions.com/sending-mail-via-nodemailer-using-your-gmail-with-oauth2/) - Oauth 2.0 setup on localhost   
[[3]](https://developers.google.com/identity/protocols/googlescopes) - OAuth 2.0 Scopes for Google APIs  
[[4]](https://myaccount.google.com/permissions) - google account app permissions   
[[5]](https://nodemailer.com/smtp/oauth2/) - nodemailer smtp oauth2  
[[6]](https://trello.com/c/bClKZYX9) - trello notes

@weaponsforge  
20200202
