import { nanoid } from "nanoid";
import fs from "fs/promises"
import path from "path"

const contactsPath = path.resolve("db", "contacts.json")

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data)
}

export const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find(({id}) => id === contactId);
    return result || null
}

export const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const removedItem = contacts.find(({ id }) => id === contactId)
    removedItem && await updateContacts(contacts.filter(({ id }) => id !== contactId))
    return removedItem || null
  
}

export const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}
