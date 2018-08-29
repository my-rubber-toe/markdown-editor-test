var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Database schema for Documents
var documentSchema = new Schema({
    name:String,
    content:String,
    lastModified:{type: Date, default: Date.now()},
    creationDate:{type: Date, default: Date.now()},
    sessionId: String
},{
    toObject:{
        virtuals: true
    },
    toJSON:{
        virtuals:true
    }
});

module.exports = mongoose.model('documents', documentSchema)