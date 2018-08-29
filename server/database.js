//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/markdown';
//var mongoDB = 'mongodb://markdownadmin:markdown12345@ds133597.mlab.com:33597/markdown-editor'
var optionsDB = {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval:2000,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 120000 // 2 minutes to conection timeout
}
mongoose.connect(mongoDB, optionsDB)
    .then(response => console.log('\nDatabase connection established at ' + mongoDB))
    .catch(err => console.log(err));

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
