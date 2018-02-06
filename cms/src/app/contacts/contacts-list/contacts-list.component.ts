import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Contacts} from "../contacts.model";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  @Output() contactWasSelectedEvent = new EventEmitter<Contacts>();

  contacts: Contacts[] = [
    new Contacts('1', 'Bro. Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jackson.jpg', 'null'),
    new Contacts('2', 'Bro. Barzee', 'barzeer@byui.edu', '208-496-3768', 'https://web.byui.edu/Directory/Employee/barzeer.jpg', 'null')
  ];

  constructor() { }

  ngOnInit() { }

  onContactSelected(contact: Contacts) {
    this.contactWasSelectedEvent.emit(contact);
  }
}
