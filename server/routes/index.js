const express = require('express');
const router = express.Router();

////////////////DB CONNECTION//////////////
const database = require('../database') 
////////////////DB CONNECTION/////////////


var sessionCtrl = require('./controllers/sessionCtrl');
var documentCtrl = require('./controllers/documentCtrl');

////////////////////////SESSION////////////////////////////
router.post('/get-session', sessionCtrl.getSession);

router.post('/new-session', sessionCtrl.newSession);

router.put('/save-session', sessionCtrl.saveSession)

router.put('/remove-session',sessionCtrl.deleteSession)


////////////////////////////DOCUMENTS/////////////////////////
router.post('/get-documents', documentCtrl.getAllDocuments);

router.post('/new-document', documentCtrl.newDocument);

router.put('/update-document', documentCtrl.updateDocument);

router.post('/delete-document', documentCtrl.deleteDocument);

router.post('/convert-pdf', documentCtrl.convertToPdf)

module.exports = router;