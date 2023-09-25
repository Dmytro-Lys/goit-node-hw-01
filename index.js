import {program} from "commander";
import * as contactService from "./contacts.js"

const invokeAction = async ({action, id, name, email, phone})=> {
    try {
        switch(action) {
            case "list":
                const contacts = await contactService.listContacts();
                return console.table(contacts);
            case "get":
                const contact = await contactService.getContactById(id);
                return console.log(contact);
            case "add":
                const newContact = await contactService.addContact(name, email, phone);
                return console.log(newContact);
            case "remove":
                const deleteContact = await contactService.removeContact(id);
                return console.log(deleteContact);
            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    }
    catch(error) {
        console.log(error.message);
        throw error;
    }
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>");

program.parse();

const options = program.opts();

invokeAction(options);