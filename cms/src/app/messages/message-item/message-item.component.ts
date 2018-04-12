import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../message.model';
import {ContactsService} from "../../contacts/contacts.service";
import {Contacts} from "../../contacts/contacts.model";

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input()message: Message;
  messageSender: string = "";

  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    let contact: Contacts = this.contactService.getContact(this.message.sender);
    //this.messageSender = contact.name;
    this.messageSender = contact.name;
  }

}
