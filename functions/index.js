

const functions = require('firebase-functions');
// var admin = require('firebase-admin');
// const express = require('express');
//Email Start
const nodemailer = require('nodemailer');
// const app = express()

// var emailRecepient;
// var userName;

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
 

const transporter = nodemailer.createTransport({
  service: "gmail",
  // host: 'smtp.gmail.com',
  auth: {
    user: 'ethanluke.portfolio@gmail.com', 
    pass: 'hunghom2011'
  }
  });

exports.sendEmails1 = functions.database.ref('/messages/{name}').onCreate((snap, context) => {

  const vals = snap.val()
  var name = vals.Name;
  var email = vals.Email;
  var message = vals.Message;

  var mailOptions = {
    from: 'ethanluke.portfolio@gmail.com',
    to: 'ethanluke.portfolio@gmail.com',
    subject: 'New Form Submitted',
    html:`<h1>New Form Submitted:</h2><p>From: ${name}, ${email}</p> <p>Message: ${message}</p>`
    // html:" <h2><p>${Name}, ${Email}</p></h2><h3>${message}</h3>"
  };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      else {
        console.log('Email sent: ' + info.response);
      }
    });

  return null;
});

//Email end

//Recaptcha start

const rp = require('request-promise')

exports.checkRecaptcha = functions.https.onRequest((req, res) => {
    const response = req.query.response
    console.log("recaptcha response", response)
    rp({
        uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
        method: 'POST',
        formData: {
            secret: '6LealK8UAAAAAG_PYZx00-YdGE5XUFsmqHIsCmGU',
            response: response
        },
        json: true
    }).then(result => {
        console.log("recaptcha result", result)
        if (result.success) {
            res.send("You're good to go, human.")
        }
        else {
            res.send("Recaptcha verification failed. Are you a robot?")
        }
    }).catch(reason => {
        console.log("Recaptcha request failure", reason)
        res.send("Recaptcha request failed.")
    })
})