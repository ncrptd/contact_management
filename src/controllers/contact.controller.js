const { Contact } = require('../models/contact.model');

async function getContacts(req, res) {
    try {
        const contacts = await Contact.find({});
        return res.send(contacts)
    } catch (error) {
        console.error('Error getting all contacts')
        return res.status(500).json({ error: 'Failed to get Contacts', message: error.message })
    }
};
async function getContactById(req, res) {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'No Contact found' })
        }
        return res.send(contact)
    } catch (error) {
        console.error('Error finding contacts', error)
        return res.status(500).json({ error: 'Failed to get Contact By Id', message: error.message })
    }
};

async function createContact(req, res) {
    try {
        const contactDetails = req.body;
        if (!contactDetails || Object.keys(contactDetails).length === 0) {
            return res.status(400).json({ error: 'Invalid Contact Data' })
        }
        const newContact = new Contact(contactDetails);
        const savedContact = await newContact.save();
        return res.status(201).json(savedContact)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(404).json({ error: 'Validation error', message: error.message })
        }
        console.error('Error creating a new contact: ', error);
        return res.status(500).json({ error: 'Failed to create a new contact', message: error.message })
    }
};

async function updateContact(req, res) {
    try {
        const id = req.params.id;
        const updateDetails = req.body;

        if (!updateDetails || Object.keys(updateDetails).length === 0) {
            return res.status(400).json({ error: 'Invalid update data' })
        }
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(400).json({ error: 'Contact not found' })
        }
        Object.assign(contact, updateDetails);
        await contact.save();
        res.send(contact);
    } catch (error) {
        console.error('Error updating contact', error)
        res.status(500).json({ error: 'Failed to update Contact', message: error.message })
    }
};

async function deleteContact(req, res) {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'No Contact found' })
        }
        return res.json({ message: 'Contact deleted successfully', data: contact })
    } catch (error) {
        console.error('Failed to delete contact', error);
        return res.status(500).json({ error: 'Failed to delete contact', message: error.message });

    }
}
module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact }