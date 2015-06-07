'use strict';
var router = require('express').Router();
module.exports = router;
var cps = require("cps-api");
var cpsConn = require("../../../db").cpsConn;
function S4() {
  //use this to generate random ID
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}





router.get('/', function(req, res){

});

router.post('/', function(req, res){
  console.log("inserting to clusterpoint from api/tours/ *POST");

  var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();

  // Insert
  var id = guid,
    name = "test";

  var insert_request = new cps.InsertRequest('<document><id>'+id+'</id>'+cps.Term(name, "name")+'</document>');

  cpsConn.sendRequest(insert_request, function(err, insert_response) {
    if (err) return console.error(err);
    console.log('New user registered: ' + insert_response.document.id);
  });

  var entry = req.body;
});

router.get('/:id', function(req, res){

});

router.put('/:id', function(req, res){
	var update = req.body;
});

router.delete('/:id', function(req, res){

});