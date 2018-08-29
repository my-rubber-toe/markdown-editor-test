var mongoose = require('mongoose');

var Schema = mongoose.Schema;


//Database Schema for sessions
var sessionSchema = new Schema({
    creationDate:{type: Date, default: Date.now()},
    lastModified: {type: Date, default: Date.now()},
    saved: {type: Boolean, default: false}
},{
    toObject:{
        virtuals: true
    },
    toJSON:{
        virtuals:true
    }
});

module.exports = mongoose.model('session', sessionSchema)