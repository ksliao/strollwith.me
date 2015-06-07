'use strict';
var MyClient = require('idol-client')({
	APIkey: '4ea45598-9ea2-4c4a-b11a-78e8ee81fae8',
	autoResult: true });
var router = require('express').Router();
module.exports = router;


router.get('/', function (req, res){
	console.log("HELLO");
	 MyClient.recognizeSpeech({
	     method: 'POST',
	     type: 'async',
	     parameters: {
	         file: 'myFileName'
	         // interval: //seconds
	     },
	     files: {
	         myFileName: __dirname + '/hpnext.mp4' // See IDOL supported files.
	     }
	 }).then(
	     function(res){
	         console.log(res.code);    // => 200-299
	         console.log(res.headers);    // => Response headers
	         console.log("DATA", res.data.jobID);
	         return MyClient.jobResult(res.data.jobID);


	             // => Response data
	     },
	     function(error){ console.log('Ups, some error occured:', error); }
	 ).then(function(text){
	 			console.log("TRANSCRIPTION", text.data.actions[0].result.document[0].content);
	         });
	 // MyClient.on('job result', function(job){
	 // 	console.log("YOUR JOB!", job);
	 // })

});

// https://api.idolondemand.com/1/job/status/usw3p_e972b818-17b6-4b80-afbe-407aa013af50?apikey=4ea45598-9ea2-4c4a-b11a-78e8ee81fae8
