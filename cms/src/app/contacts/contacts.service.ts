import {Contacts} from "./contacts.model";
import {Injectable} from "@angular/core";
import {EventEmitter} from "@angular/core";
import { Subject } from 'rxjs/Subject';
import {HttpHeaders, HttpClient, HttpResponse} from "@angular/common/http";

@Injectable()
export class ContactsService {
  contacts: Contacts[] = [];
  contactSelectedEvent = new EventEmitter<Contacts>();
  contactListChangedEvent = new Subject<Contacts[]>();
  maxId: number;
  currentId;
  maxContactId: number;
  contactsListClone;

  constructor(private http: HttpClient) {
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

  deleteContact(contacts: Contacts) {
    if (!contacts) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contacts.id)
      .map(
        (response: any) => {
          return response.obj;
        })
      .subscribe(
        (contacts: Contacts[]) => {
          this.contacts = contacts;
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }

   getMaxId(): number{
     this.maxId = 0;
     for (let contact of this.contacts) {
       this.currentId = parseInt(contact.id);
       if (this.currentId > this.maxId) {
         this.maxId = this.currentId;
       }
     }
     return this.maxId;
   }

   addContact(contact: Contacts) {
     if(!contact){
       return;
     }

     const headers = new HttpHeaders( {
       'Content-Type': 'application/json'
     });

     contact.id = '';
     const strContact = JSON.stringify(contact);

     this.http.post('http://localhost:3000/contacts', strContact, {headers: headers})
       .map(
         (response: any) => {
           return response.obj;
         })
       .subscribe(
         (contacts: Contacts[]) => {
           this.contacts = contacts;
           this.contactListChangedEvent.next(this.contacts.slice());
         });
   }

   updateContact (originalContact: Contacts, newContact: Contacts){
     if (!originalContact || !newContact) {
       return;
     }
     const pos = this.contacts.indexOf(originalContact);
     if (pos < 0){
       return;
     }

     const headers = new HttpHeaders( {
       'Content-Type': 'application/json'
     });

     const strContact = JSON.stringify(newContact);

     this.http.patch('http://localhost:3000/contacts/' + originalContact.id, strContact, {headers: headers})
       .map (
         (response: any) => {
           return response.obj;
         })
       .subscribe(
         (contacts: Contacts[]) => {
           this.contacts = contacts;
           this.contactListChangedEvent.next(this.contacts.slice());
         });
   }

   initContacts(){
    this.http.get('http://localhost:3000/contacts')
      .map(
        (response: any) => {
          return response.obj;
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

  // storeContacts(){
  //   JSON.stringify(this.contacts);
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.put('https://prj-cms.firebaseio.com/contacts.json', this.getContacts())
  //     .subscribe(
  //       () => {
  //         this.contactListChangedEvent.next(this.contacts.slice());
  //       }
  //     );
  // }
}

