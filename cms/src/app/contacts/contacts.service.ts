import {Contacts} from "./contacts.model";
import {MOCKCONTACTS} from "./MOCKCONTACTS";
import {Injectable} from "@angular/core";
import {EventEmitter} from "@angular/core";
import { Subject } from 'rxjs/Subject';
import {Document} from "../documents/document.model";
import {Headers, Response} from "@angular/http";
import { Http } from "@angular/http";


@Injectable()
export class ContactsService {
  contacts: Contacts[] = [];
  contactSelectedEvent = new EventEmitter<Contacts>();
  contactListChangedEvent = new Subject<Contacts[]>();
  maxId: number;
  currentId;
  maxContactId: number;
  contactsListClone;

  constructor(private http: Http) {
    //this.contacts = MOCKCONTACTS;
    this.initContacts();
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

    this.contacts.splice(pos, 1);
    this.contactsListClone = this.contacts.slice();
    //this.contactListChangedEvent.next(this.contactsListClone);
    this.storeContacts();
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
     //this.contactListChangedEvent.next(this.contactsListClone);
     this.storeContacts();
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
     //this.contactListChangedEvent.next(this.contactsListClone);
     this.storeContacts();
   }

  initContacts(){
    this.http.get('https://prj-cms.firebaseio.com/contacts.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .subscribe(
        (contactsReturned: Contacts[]) => {
          this.contacts = contactsReturned;
          this.maxContactId = this.getMaxId();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  storeContacts(){
    JSON.stringify(this.contacts);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('https://prj-cms.firebaseio.com/contacts.json', this.getContacts())
      .subscribe(
        () => {
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }
}

