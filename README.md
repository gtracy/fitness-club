# Fitness Club Notifications
A simple SMS app that connects to an exercise tracking spreadsheet and sends encouraging messages to participants. 

The repo depends on an interface with Google Sheets as the datastore for the data. Why? Why not... There are probably never going to be more than a few dozen club members. There's a template version of the spreadsheet you can copy [here](https://docs.google.com/spreadsheets/d/1rpjUa3mf0R4KxwaqiIKl3MHGfJE7B9ym-6OZRr3yy6Q/edit)

If you are forking and deploying your own app, you just need to update the ```config.js``` file with your own keys. 

## Get Started Locally

`npm install`

`node app.local.js`

When running locally, you'll need to setup a local tunnel like [ngrok](https://ngrok.com) to route traffic to your local machine.

