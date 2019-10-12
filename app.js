'use strict';

let config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const logme = require('logme');
const rules = require('./lib/rules');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/test', (req, res) => {
    rules.run(() => {
        logme.debug('success.\n');
        res.send();
    });
});

app.post('/sms/receive', (req,res) => {
    if ( req.body.AccountSid === process.env.TWILIO_ACCOUNT_SID ) {
        logme.debug('inbound SMS message from '+req.body.From+' : '+req.body.Body);

        // nothing to do here with users replying. just say thanks.
        const twiml = new MessagingResponse();
        twiml.message('thanks for writing. nobody is responding to these. sorry!');

        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    }

});

module.exports = app;