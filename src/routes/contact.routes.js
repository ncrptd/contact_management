const express = require('express');
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require('../controllers/contact.controller');

const contactRouter = express.Router();

contactRouter.route('/').get(getContacts).post(createContact);
contactRouter.route('/:id').get(getContactById).put(updateContact).delete(deleteContact)

module.exports = { contactRouter }