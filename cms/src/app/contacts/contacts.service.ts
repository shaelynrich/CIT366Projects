import {Contacts} from "./contacts.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Injectable} from "@angular/core";
import {EventEmitter} from "@angular/core";
import { Subject } from 'rxjs/Subject';
import {Document} from "../documents/document.model";


@Injectable()
export class ContactsService {
  contacts: Contacts[] = [];
  contactSelectedEvent = new EventEmitter<Contacts>();
  contactListChangedEvent = new Subject<Contacts[]>();
  maxId: number;
  currentId;
  maxContactId: number;
  contactsListClone;

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contacts[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contacts {
    for(let contact of this.contacts){
        if (contact.id === id){
          return contact;
        }
    }
    return null;
  }

  deleteContact(contacts: Contacts){
    if (contacts === null || contacts === undefined) {
      return;
    }

    const pos = this.contacts.indexOf(contacts);
    if (pos < 0) {
      return;
    }

    // let tmpContacts: Contacts[] = [];
    // const consLength = this.contacts.length;
    // for (let i=0; i < pos; i++){
    //   tmpContacts.push(this.contacts[i]);
    // }
    // for (let j=pos+1; j<consLength; j++){
    //   tmpContacts.push(this.contacts[j]);
    // }

    //this.contactsListClone = tmpContacts;
    this.contacts.splice(pos, 1);
    //this.contacts = this.contacts.splice(pos, 1);
    this.contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(this.contactsListClone);
  }

   getMaxId(): number{
     this.maxId = 0;
     for (let contact of this.contacts) { //each document in the documents list
       this.currentId = parseInt(contact.id); //convert document.id into a number
       if (this.currentId > this.maxId) { //   if currentId > maxId then
         this.maxId = this.currentId;//     maxId = current ID
       }
     }
     return this.maxId;
   }

   addContact(newContact: Contacts) {
     if(newContact === undefined || newContact === null){
       return;
     }
     this.maxContactId++;
     newContact.id = this.maxContactId.toString();
     this.contacts.push(newContact);
     this.contactsListClone = this.contacts.slice();
     this.contactListChangedEvent.next(this.contactsListClone);
   }

   updateContact (originalContact: Contacts, newContact: Contacts){
     if (originalContact === undefined || originalContact === null || newContact === undefined || newContact === null) {
       return;
     }
     const pos = this.contacts.indexOf(originalContact);
     if (pos < 0){
       return;
     }
     newContact.id = originalContact.id;
     this.contacts[pos] = newContact;
     this.contactsListClone = this.contacts.slice();
     this.contactListChangedEvent.next(this.contactsListClone);
   }
}

