import { Component, OnInit } from '@angular/core';
import {Message} from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message('01', 'Hello everyone', 'Class starts in 5', 'Shaelyn'),
    new Message('02', 'a;lsdkfjads', 'ald;fj;oeiutleknvd.,mcvn;oi', 'Zack'),
    new Message('03', 'Hi', 'text111', 'Zachy')
  ];

  constructor() { }

  ngOnInit() {
  }

  onAddMessage(message: Message){
    this.messages.push(message);
  }

}
