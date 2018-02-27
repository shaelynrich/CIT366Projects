import { Component, OnInit } from '@angular/core';
import { Contacts } from "./contacts.model";
import {ContactsService} from "./contacts.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contacts;


  constructor(private contactService: ContactsService) {

  }

  ngOnInit() {
    this.contactService.contactSelectedEvent
      .subscribe(
        (contact: Contacts) => {
          this.selectedContact = contact;
        }
        );
  }

}
