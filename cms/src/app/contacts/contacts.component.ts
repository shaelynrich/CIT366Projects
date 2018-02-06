import { Component, OnInit } from '@angular/core';
import { Contacts } from "./contacts.model";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contacts;


  constructor() { }

  ngOnInit() {
  }

}
