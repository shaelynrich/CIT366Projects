var express = require('express');
var Contact = require('../models/contact');
var SequenceGenerator = require('../routes/SequenceGenerator');
var router = express.Router();

var getContacts = function (request, response)
{  Contact.find()
  .populate('group')
  .exec(function (err, contacts) {
    if (err) {
      return response.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    response.status(200).json({
      obj: contacts
    });
  });
}

var saveContact = function (response, contact)
{
  // replace contacts in group contact with their primary key (_id) values
  if (contact.group && contact.group.length > 0) {
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }
  Contact.save(function (err, result) {
    response.setHeader('Content-Type', 'application/json');
  if (err) {
    return response.status(500).json({
      title: 'An error occurred',
      error: err
    });
  }
  getContacts(response);
});
}

var deleteContact = function (response, contact)
{ Contact.remove(function(err, result) {
  if (err) {
    return response.status(500).json({
      title: 'An error occurred',
      error: err
    });
  }
  getContacts();
});
}

router.get('/', function (request, response, next){
  getContacts(response);
});

router.post('/', function (request, response, next) {
  var maxContactId = SequenceGenerator.nextId("contacts");
  var contact = new Contact({
    id: maxContactId,
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone,
    imageUrl: request.body.imageUrl
  });
  saveContact(response, contact);
});

router.patch('/:id', function (request, response, next){
  Contact.findOne({id: request.params.id}, function (err, contact){
    if (err || !contact) {
      return response.status(500).json({
        title: 'No Contact Found!',
        error: {contact: 'Contact not found'}
      });
    }

    contact.name = request.body.name;
    contact.email = request.body.email;
    contact.phone = request.body.phone;
    contact.imageUrl = request.body.imageUrl;

    saveContact(response, contact);
  });
});

router.delete('/:id', function (request, response, next) {
  var query = {id: request.params.id};

  Contact.findOne(query, function (err, contact) {
    if (err) {
      return response.status(500).json({
        title: 'No Contact Found',
        error: err
      });
    }
    if (!contact) {
      return response.status(500).json({
        title: 'No Contact Found!',
        error: {contactId: request.params.id}
      });
    }

    deleteContact(response, contact);
  });
});
