"use strict"

const config = require('../config');
const {google} = require('googleapis');

const Google = function() {
    var self = this;
    
    this.sheets = google.sheets({
        version: 'v4',
        auth: config.googleAPI.key
    });
    
};

/**
 * Fetch a list of data spreadsheets
 *
 */
Google.prototype.getFitnessClub = function(callback) {

    this.sheets.spreadsheets.values.get({
        spreadsheetId: config.sheet.id,
        range: config.sheet.range,
    },(err, res) => {
        if (err) {
            console.error('The API returned an error.');
            throw err;
        }
        const rows = res.data.values;
        if (rows.length === 0) {
            console.log('No data found.');
            callback(undefined);
        } else {
            // build up an object for each row
            var totals = [];
            for (const row of rows) {
                totals.push({
                    name : `${row[0]}`,
                    start_date : `${row[1]}`,
                    points_total : `${row[2]}`,
                    points_today : `${row[3]}`,
                    points_avg : `${row[4]}`,
                    phone : `${row[5]}`,
                    avg_delta : `${row[6]}`
                });
            }
            callback(totals);
        }
    });
};

module.exports = Google;
