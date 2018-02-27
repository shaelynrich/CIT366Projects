import {Contacts} from "./contacts.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Injectable} from "@angular/core";
import {EventEmitter} from "@angular/core";

@Injectable()
export class ContactsService {
  contacts: Contacts[] = [];
  contactSelectedEvent = new EventEmitter<Contacts>();

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
}

