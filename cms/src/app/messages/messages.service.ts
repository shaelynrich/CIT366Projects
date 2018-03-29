import {Message} from "./message.model";
import {MOCKMESSAGES} from "./MOCKMESSAGES";
import {Injectable, EventEmitter} from "@angular/core";
import {Headers, Response} from "@angular/http";
import {Http} from "@angular/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MessagesService{
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;
  maxId: number;
  currentId;

  constructor(private http: Http) {
    //this.messages = MOCKMESSAGES;
    this.initMessages();
  }

  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for(let message of this.messages){
      if (message.id === id){
        return message;
      }
    }
    return null;
  }

  getMaxId(): number{
    this.maxId = 0;
    for (let message of this.messages) { //each document in the documents list
      this.currentId = parseInt(message.id); //convert document.id into a number
      if (this.currentId > this.maxId) { //   if currentId > maxId then
        this.maxId = this.currentId;//     maxId = current ID
      }
    }
    return this.maxId;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  initMessages(){
    this.http.get('https://prj-cms.firebaseio.com/messages.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .subscribe(
        (messagesReturned: Message[]) => {
          this.messages = messagesReturned;
          this.maxMessageId = this.getMaxId();
          this.messageListChangedEvent.next(this.messages.slice());
        }
      );
  }

  storeMessages(){
    JSON.stringify(this.messages);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('https://prj-cms.firebaseio.com/messages.json', this.getMessages())
      .subscribe(
        () => {
          this.messageListChangedEvent.next(this.messages.slice());
        }
      );
  }
}

