var async = require('async');

var sessionModel = require('../models/session-model.js');

/**
  * @desc Get Session
  * @param req - The HttpRequest sent from the client. Json body has the sessionId
  * @param res - Response of the http request.
  * @return The sessionId
*/
exports.getSession = function(req, res){

    sessionModel
        .where('_id', req.body.id)
        .exec(function(err, result){
            if(err){
                res.send(err)
            }else{
                res.send(result._id);
            }
        });
} 

/**
  * @desc Create new Session
  * @param req - The HttpRequest sent from the client.
  * @param res - Response of the http request.
  * @return New Session 
*/
exports.newSession = function(req, res){

    var newSession = {
        creationDate: Date.now()
    }

    sessionModel
        .create(newSession, (err, result)=>{
            if(err){
                res.send(err)
            }else{                
                res.send(result);
            }
        });
}

exports.saveSession = function(){
    console.log('save SESSION')
}

exports.deleteSession = function(){}


