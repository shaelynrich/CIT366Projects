import { Component, OnInit, Input } from '@angular/core';
import {Contacts} from "../contacts.model";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  @Input() contact: Contacts;

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe();
  }

}
