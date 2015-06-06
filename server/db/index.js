'use strict';
var Q = require('q');
var path = require('path');
var chalk = require('chalk');

var cps = require('cps-api');
var cpsData = require('./apidata');

var cpsConn = new cps.Connection(cpsData.url, cpsData.dbName, cpsData.username, cpsData.password, "document", "document/id", cpsData.account);

//mongo stuff
var DATABASE_URI = require(path.join(__dirname, '../env')).DATABASE_URI;

//mongo stuff
var mongoose = require('mongoose');
var db = mongoose.connect(DATABASE_URI).connection;

// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./models/user');

var startDbPromise = new Q(function (resolve, reject) {
    cpsConn.on('open', resolve);
    cpsConn.on('error', reject);
});

console.log(chalk.yellow('Opening connection to Clusterpoint . . .'));
startDbPromise.then(function () {
    console.log(chalk.green('Clusterpoint connection opened!'));
});

module.exports = {
	startDbPromise: startDbPromise,
	cpsConn : cpsConn
};