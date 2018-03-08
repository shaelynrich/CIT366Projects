import {Contacts} from "./contacts.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Injectable} from "@angular/core";
import {EventEmitter} from "@angular/core";

@Injectable()
export class ContactsService {
  contacts: Contacts[] = [];
  contactSelectedEvent = new EventEmitter<Contacts>();
  contactChangedEvent = new EventEmitter<Contacts[]>();

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
    if (contacts === null) {
      return;
    }

    const pos = this.contacts.indexOf(contacts);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}

