const fs = require('fs')
const path = require('path')

const contactsLocation = path.join(__dirname,"contacts.json");
const getContacts = () => JSON.parse(fs.readFileSync(contactsLocation));
const saveContacts = (contact) => fs.writeFileSync(contactsLocation,JSON.stringify(contact)); 
module.exports = {contactsLocation, getContacts, saveContacts}
