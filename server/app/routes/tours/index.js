'use strict';
var router = require('express').Router();
module.exports = router;
var MyClient = require('idol-client')({
  APIkey: '4ea45598-9ea2-4c4a-b11a-78e8ee81fae8',
  autoResult: true });
var cps = require("cps-api");
var cpsConn = require("../../../db").cpsConn;

function S4() {
  //use this to generate random ID
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}


router.get('/', function(req, res){

  // var doc = {name: "yes", location: "no"};
  var list_req = new cps.ListLastRequest({}, 0, 20);
  cpsConn.sendRequest(list_req, function (err, list_resp) {
     if (err) return console.log(err);
     console.log("JSON INFO", list_resp);
     res.send(list_resp.results.document)
  }, 'json');



});



router.post('/', function(req, res){
  console.log("inserting to clusterpoint from api/tours/ *POST");
  var entry = req.body;

  var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  entry.points.forEach(function(point){

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


  });
  // Insert
  var id = guid;
  var obj = { id: id, creator: "", name: "", description: "", points: [{ latitude: 0, longitude: 0, audioUrl: "", imagesUrl: []}] };

  var insert_request = new cps.InsertRequest(obj);

  cpsConn.sendRequest(insert_request, function(err, insert_response) {
    if (err) return console.error(err);
    console.log('New user registered: ' + insert_response.document.id);
  });

});

router.get('/:id', function(req, res, next){
  var cpsId = req.params.id;
  console.log(req.params.id);
  var retrieve_req = new cps.RetrieveRequest(cpsId);
  cpsConn.sendRequest(retrieve_req, function (err, retrieve_resp) {
     if (err) return next(err);
     if (retrieve_resp) {
        console.log(retrieve_resp.results.document[0]);
        res.json(retrieve_resp.results.document[0]);
     }
  }, 'json');
});

router.put('/:id', function(req, res){
	var update = req.body;
});

router.delete('/:id', function(req, res){

});