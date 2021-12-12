const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactPath = path.join(__dirname, "db", "contacts.json");

const readContent = async () => {
  const content = await fs.readFile(contactPath, "utf8");
  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  return await readContent();
};

const getContactById = async (contactId) => {
  const contacts = await readContent();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContent();
  const contact = contacts.find((contact) => contact.id === contactId);
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  if (contact) {
    await fs.writeFile(contactPath, JSON.stringify(filteredContacts, null, 2));
    return filteredContacts;
  }
};

const addContact = async (name, email, phone) => {
  const contacts = await readContent();
  const newContact = { name, email, phone, id: crypto.randomUUID() };

  if (!newContact.name || !newContact.email || !newContact.phone) {
    console.log("Please fill all fields to add a new contact!");
  }
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
