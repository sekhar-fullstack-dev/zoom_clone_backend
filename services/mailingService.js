var nodemailer = require('nodemailer');
const {google} = require('googleapis');
require('dotenv').config()

const oAuthClient = new google.auth.OAuth2(process.env.OAUTH_CLIENT_ID, process.env.OAUTH_CLIENT_SECRET, process.env.REDIRECT_URL)
oAuthClient.setCredentials({refresh_token: process.env.GMAIL_REFRESH_TOKEN})


var transporter = (accessToken)=>{
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.ADMIN_EMAIL,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessToken
    }
  });
}

var mailOptions =(receiver, msj)=> {
    return {
    from: process.env.ADMIN_EMAIL,
    to: receiver,
    subject: 'VERIFY EMAIL',
    text: msj
  }
};

this.sendEmail = async(receiver, msj)=>{
    var accessToken = await oAuthClient.getAccessToken()
    transporter(accessToken).sendMail(mailOptions(receiver, msj), function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = this