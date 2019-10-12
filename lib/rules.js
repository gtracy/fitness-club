'use strict';

const {_} = require('underscore');
const Google = require('./google');

module.exports.run = function(callback) {
    // setup the interface for Google Sheets
    const google = new Google();
    google.getFitnessClub((sheet) => {

        // find today's high-score
        const high_scores = _.sortBy(sheet, (user) => {
            return -user.points_today;
        });
        console.log('High Scorer today : ' + high_scores[0].name + ' -> ' + high_scores[0].points_today);

        // find the total number of users that scored today
        let user_active = 0;
        sheet.forEach((user) => {
            if ( user.points_today > 0 ) {
                user_active++;
            }
        });
        console.log('Active Users Today : ' + user_active);

        // find the highest average in the group
        const high_averages = _.sortBy(sheet, (user) => {
            return -user.points_avg;
        });
        console.log('Highest Average : ' + high_scores[0].name + ' -> ' + high_scores[0].points_avg)

        // remind people to get after it today

        callback();
    });
};


