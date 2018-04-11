var express = require('express');
var Document = require('../models/document');
var SequenceGenerator = require('../routes/SequenceGenerator');
var router = express.Router();
module.exports = router;

var getDocuments = function (response) {
  Document.find()
    .exec(function (err, documents) {
      if (err) {
        return response.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      response.status(200).json({
        document: 'Success',
        obj: documents
      });
    });
}

var saveDocument = function (response, document)
{  document.save(function (err, result) {
    if (err) {
      return response.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    getDocuments(response);
  });
}

var deleteDocument = function (response, document)
{ document.remove(function(err, result) {
  if (err) {
    return response.status(500).json({
      title: 'An error occurred',
      error: err
      });
    }
  getDocuments(response);
  });
}

router.get('/', function (request, response, next){
  getDocuments(response);
});

router.post('/', function (request, response) {
  var maxDocumentId = SequenceGenerator.nextId("documents");
  var document = new Document({
    id: maxDocumentId,
    name: request.body.name,
    description: request.body.description,
    url: request.body.url
  });
  saveDocument(response, document);
});

router.patch('/:id', function (request, response, next){
  Document.findOne({id: request.params.id}, function (err, document){
    if (err || !document) {
      return response.status(500).json({
        title: 'No Document Found!',
        error: {document: 'Document not found'}
      });
    }

    document.name = request.body.name;
    document.description = request.body.description;
    document.url = request.body.url;

    saveDocument(response, document);
  });
});

router.delete('/:id', function (request, response, next) {
  var query = {id: request.params.id};

  Document.findOne(query, function (err, document) {
    if (err) {
      return response.status(500).json({
        title: 'No Document Found',
        error: err
      });
    }
    if (!document) {
      return response.status(500).json({
        title: 'No Document Found!',
        error: {documentId: request.params.id}
      });
    }

    deleteDocument(response, document);
  });
});
