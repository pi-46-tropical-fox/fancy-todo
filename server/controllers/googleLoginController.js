const {User} = require("../models")
// const bcrypt = require('bcryptjs');
const {generateToken, verifyToken} = require("../helpers/userToken");
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOOGLE_CLIENT_ID);

class GoogleLogin {
  static async verifyLogin(req, res, next){
    try{
      // console.log("is it work")
      // console.log(req)
      const {google_access_token} = req.headers
      // console.log(google_access_token);
      let ticket = await client.verifyIdToken({
        idToken : google_access_token,
        audience: process.env.GOOOGLE_CLIENT_ID
      })
      console.log(ticket)
      const payload = ticket.getPayload();       
      console.log(payload);   //payload contain user EMAIL, NAME, dll
      let userData = await User.findOne({where:{email: payload.email}})
      if(userData){
        //generate access_token 
        const newUser = {
          id: userData.id,
          email: userData.email,
          username: payload.email
        }
        let access_token = generateToken(newUser)
        res.status(200).json({access_token})
      }
      else{
        //create data on databse
        let newGoogleUser = await User.create({
          email : payload.email,
          username: payload.email,
          password: "Asdf1234!@#$"
        })
        //generate access token
        let access_token = generateToken(newGoogleUser)
        res.status(200).json({access_token})
      }
    }catch(err){
      next(err)
    }
  }


  static calendar(req,res,next){
    const fs = require('fs');
    const readline = require('readline');
    const {google} = require('googleapis');

    // // If modifying these scopes, delete token.json.
    const SCOPES = ['https://www.googleapis.com/auth/calendar'];
    // // The file token.json stores the user's access and refresh tokens, and is
    // // created automatically when the authorization flow completes for the first
    // // time.
    const TOKEN_PATH = './token.json';

    // Load client secrets from a local file.
    fs.readFile("./controllers/credentials.json", (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content), listEvents);
    });
    // authorize()
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * param {Object} credentials The authorization client credentials.
     * param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
          client_id, client_secret, redirect_uris[0]);

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
      param {getEventsCallback} callback The callback for the authorized client.
    */
    function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

  function listEvents(auth) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
          console.log(`${start} - ${event.summary}`);
        });
      } else {
        console.log('No upcoming events found.');
      }
    });
  }
  }
}

module.exports = GoogleLogin