import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {Message} from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject')subjectRef: ElementRef;
  @ViewChild('msgText')msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const sender: string = "Shaelyn";
    let newMessage: Message = new Message("", subject, msgText, sender);
    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = " ";
    this.msgTextRef.nativeElement.value = " ";
    this.subjectRef.nativeElement.focus();
  }

}
