import { Component, OnInit } from '@angular/core';
import {Contacts} from "../contacts.model";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {

  contacts: Contacts[] = [];

  constructor(private contactService: ContactsService) {
    this.contacts = this.contactService.getContacts();
  }

  ngOnInit() { }

  onContactSelected(contact: Contacts) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
