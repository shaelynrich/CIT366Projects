import { Component, OnInit } from '@angular/core';
import {Contacts} from "../contacts.model";
import {ContactsService} from "../contacts.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  private subscription: Subscription;
  contacts: Contacts[] = [];
  term: String = "";

  constructor(private contactService: ContactsService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contacts[]) => {
          this.contacts = contactsList;
        }
      );
  }

  onContactSelected(contact: Contacts) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  onKeyPress(value: string){
    this.term = value;
  }
}
