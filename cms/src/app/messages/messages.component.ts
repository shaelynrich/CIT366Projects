import { Component, OnInit } from '@angular/core';
import {Message} from "../messages/message.model";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  message: Message;

  constructor() { }

  ngOnInit() {
  }

}
