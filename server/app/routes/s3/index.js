'use strict';
var router = require('express').Router();
module.exports = router;

var awsCredentials = require("./awsdata");


var s3 = require('s3');
 
var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default 
  s3RetryCount: 3,    // this is the default 
  s3RetryDelay: 1000, // this is the default 
  multipartUploadThreshold: 20971520, // this is the default (20 MB) 
  multipartUploadSize: 15728640, // this is the default (15 MB) 
  s3Options: {
    accessKeyId: awsCredentials.accessKeyId,
    secretAccessKey: awsCredentials.secretAccessKey
    // any other options are passed to new AWS.S3() 
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property 
  },
});

var params = {
  localFile: "public/audio",
 
  s3Params: {
    Bucket: "angelhack2015-audio-tour",
    Key: awsCredentials.accessKeyId,
    // other options supported by getObject 
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property 
  },
};


router.get('/', function(req, res){
	console.log("entered get at s3/");
	var downloader = client.downloadFile(params);
	downloader.on('error', function(err) {
	  console.error("unable to download:", err.stack);
	});
	downloader.on('progress', function() {
	  console.log("progress", downloader.progressAmount, downloader.progressTotal);
	});
	downloader.on('end', function() {
	  console.log("done downloading");
	});

});

router.post('/', function(req, res){
	
});

router.get('/:id', function(req, res){

});

router.delete('/:id', function(req, res){

});

