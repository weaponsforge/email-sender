## email-sender

> Testing nodemailer with Google Gmail, SMTP and OAuth2 for sending emails.

### Prerequisites

1. Windows OS 64 bit
2. NodeJS: the following versions were used for this demo
	- **node**: 10.16.3
	- **npm**: 6.9.0
3. Gmail Account
	- configured with OAuth2 credentials
	- read on [**Google Gmail, SMTP and OAuth2 Setup**]() section for more information

### Content

- [**Installation**]()
- [**Usage**]()
- [**Google Gmail, SMTP and OAuth2 Setup**]()


## Installation

1. Clone this repository.  
`git clone https://github.com/weaponsforge/email-sender.git`

2. Navigate into the project's root directory.

3. Install dependencies.  
`npm install`

4. Source out the `.env.example` file to a `.env` file. Fill in the information with *your own* Google account credentials:
	- **EMAIL, CLIENT_USER**: your google email that you've configure for SMTP and OAuth2
		- read on [**Google Gmail, SMTP and OAuth2 Setup**]() section for more information
	- **CLIENT_ID**: Google Developer Project ID associated with your email
		- read on [**Google Gmail, SMTP and OAuth2 Setup, #3 - #4**]() section for more information on how to obtain this
	- **CLIENT_SECRET**: Client secret for the Google Developer Project CLIENT\_ID
	- **REDIRECT_URL**: *https://developers.google.com/oauthplayground*
	- **REFRESH_TOKEN**:
		- The initial (or any) refresh token obtained from [oauthplayground](https://developers.google.com/oauthplayground)
		- read on [**Google Gmail, SMTP and OAuth Setup2, #5**]() section for more information on how to obtain this


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


## Google Gmail, SMTP and OAuth2 Setup

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
      - **Name**: *(any name)*
      - **Authorized redirect URIs**: https://developers.google.com/oauthplayground
   - press **Create**

4. Save your **Client ID** and **Client Secret**.

5. Configure **OAuth**.
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

@weaponsforge  
20200202