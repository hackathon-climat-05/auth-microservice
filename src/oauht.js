const {google} = require('googleapis')

const getAuthorizationUrl = async () => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
    );


    const scopes = [
        'https://www.googleapis.com/auth/drive.metadata.readonly'
    ];

    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        include_granted_scopes: true
    });

    return authorizationUrl;
}

module.exports = { getAuthorizationUrl }