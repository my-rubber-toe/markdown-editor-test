var async = require('async');

var documentModel = require('../models/document-model.js'); // "Documents collection"

/**
  * @desc Return all documents that have the sa,e sessionId
  * @param req - The HttpRequest sent from the client. The value is a JSON object containing the sessionId
  * @param res - Response of the http request.
  * @return All documents.
*/
exports.getAllDocuments = function (req, res) {
    //get all documents by sessionId
    documentModel
        .where('sessionId', req.body.sId)
        .select('name content')
        .exec(function (err, result) {
            if (err) {
                res.send(err)
            } else {
                res.send(result);
                console.log('Returned Docs')
            }
        });
}

/**
  * @desc Edit document based on the property of the http request 
  * @param req - The HttpRequest sent from the client. The value is a JSON object containing the document content, document id, document new name and property to edit.
  * @param res - Response of the http request.
  * @return New Document data or new document name.
*/
exports.updateDocument = function (req, res) {
    if (req.body.property == 'content') {
        documentModel
            .update({ _id: req.body.id }, {
                content: req.body.docData,
                lastModified: Date.now()
            })
            .exec((err, result) => {

                if (err) {
                    res.send(err)
                } else {
                    res.send({ value: req.body.docData })
                    console.log('Update Complete')
                }
            });

    } else if (req.body.property == 'name') {
        var newName = req.body.docData;
        if (req.body.docData == '') {
            newName = "Untitled Document"
        }
        documentModel
            .update({ _id: req.body.id }, {
                name: newName,
                lastModified: Date.now()
            })
            .exec((err, result) => {

                if (err) {
                    res.send(err)
                } else {
                    res.send({ value: newName })
                    console.log('Update Complete')
                }
            });
    }
}

/**
  * @desc Create new Document and set sessionId to the users sessionId.
  * @param req - The HttpRequest sent from the client. The value is a JSON object containing the sessionId
  * @param res - Response of the http request.
  * @return New Document mongoose schema for the newly created document.
*/
exports.newDocument = function (req, res) {
    var newDoc = {
        sessionId: req.body.sId,
        content: defaultText,
        name: 'Untitled Document'
    }
    documentModel.create(newDoc, (err, newDoc) => {
        if (err) {
            res.send(err);
        } else {
            res.send(newDoc);
            console.log('New Doc.')
        }
    })
}

/**
  * @desc Remove Document by id
  * @param req - The HttpRequest sent from the client. The value is a JSON object containing the id of the document.
  * @param res - Response of the http request.
  * @return HttpResponse
*/
exports.deleteDocument = function (req, res) {
    // remove 
    var docId = req.body.id;
    documentModel.findOneAndRemove({ _id: docId }, function (err) {
        if (err) {
            res.send(error)
        } else {
            res.send();
            console.log('Delete Doc')
        }
    })

}

/**
  * @desc Search Document content and creates temporary markdown pdf get the buffer value of pdf and send to client. Delete PDF
  *         file after data is sent.
  * @param req - The HttpRequest sent from the client. The value is a JSON object containing the id of the document.
  * @param res - Response of the http request.
  * @return buffer - Returns Buffer array of temporary pdf file
*/
exports.convertToPdf = function (req, res) {
    var markdownpdf = require("markdown-pdf");
    var fs = require("fs");

    // Search Document
    documentModel
    .where('_id', req.body.id)
    .select('content')
    .exec(function (err, result) {
        if (err) {
            res.send(err)
        } else {
            // Document will be result[0], thus content must be result[0].content
            markdownpdf().from.string( result[0].content).to('temp/' + req.body.id + '.pdf', function () {
                    
                // Send Result
                fs.readFile('temp/' + req.body.id + '.pdf', (err, pdfBuffer)=>{
                    // Send Result as buffer
                    res.send(pdfBuffer);

                    // After result is sent, delete the temporary file
                    fs.unlink('temp/' + req.body.id + '.pdf', (err) => {
                        if (err){
                            console.log(err);
                        }else{
                            console.log('successfully deleted temp PDF.');
                        }
                    });
                });
            });                                
        }
    });
}


var defaultText = "# Tutorial for markdown syntax\n\n[Markdown Syntax Tutorial](https://guides.github.com/features/mastering-markdown/)\n\n# Headers\n# This is an <h1> tag\n## This is an <h2> tag\n###### This is an <h6> tag\n---\n\n# Enphasis\n*This text will be italic*\n_This will also be italic_\n\n**This text will be bold**\n__This will also be bold__\n\n_You **can** combine them_\n\n---\n\n# Lists\n\n### Unordered\n* Item 1\n* Item 2\n  * Item 2a\n  * Item 2b\n\n### Ordered\n1. Item 1\n1. Item 2\n1. Item 3\n   1. Item 3a\n   1. Item 3b\n\n---\n\n# Images\n\n![GitHub Logo](/images/logo.png)\nFormat: ![Alt Text](url)\n\n---\n\n# Links\nhttp://github.com - automatic!\n[GitHub](http://github.com)\n\n---\n\n# Blackquotes\n\nAs Kanye West said:\n\n> We're living the future so\n> the present is our past.\n\n---\n\n# Inline code\n\nI think you should use an\n`<addr>` element here instead.\n\n---\n\n# Syntax Highlight\n\n```javascript\nfunction fancyAlert(arg) {\n  if(arg) {\n    $.facebox({div:'#foo'})\n  }\n}\n```\n\n---\n\n# Task Lists\n\n- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> supported\n- [x] list syntax required (any unordered or ordered list supported)\n- [x] this is a complete item\n- [ ] this is an incomplete item\n\n---\n\n# Tables\n\n| First Header | Second Header |\n| ------------ | ------------- |\n| Content from cell 1 | Content from cell 2 |\n| Content in the first column | Content in the second |\n\n---"
