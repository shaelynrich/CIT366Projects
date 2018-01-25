import { Component, OnInit } from '@angular/core';
import {Contacts} from "../contacts.model";


@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contacts: Contacts[];

  constructor() { }

  ngOnInit() {
  }

}
