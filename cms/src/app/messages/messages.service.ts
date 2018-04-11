import {Message} from "./message.model";
import {Injectable, EventEmitter} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {HttpHeaders, HttpClient, HttpResponse} from "@angular/common/http";

@Injectable()
export class MessagesService{
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;
  maxId: number;
  currentId;

  constructor(private http: HttpClient) {
    this.initMessages();
  }

  getMessages(): Message[]{
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    for(let message of this.messages){
      if (message.id == id){
        return message;
      }
    }
    return null;
  }

  getMaxId(): number{
    this.maxId = 0;
    for (let message of this.messages) {
      this.currentId = parseInt(message.id);
      if (this.currentId > this.maxId) {
        this.maxId = this.currentId;
      }
    }
    return this.maxId;
  }

  addMessage(message: Message) {
    if(!message){
      return;
    }

    const headers = new HttpHeaders( {
      'Content-Type': 'application/json'
    });

    message.id = '';
    const strMessage = JSON.stringify(message);

    this.http.post('http://localhost:3000/messages', strMessage, {headers: headers})
      .map(
        (response: any) => {
          return response.obj;
        })
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.messageListChangedEvent.next(this.messages.slice());
        });
    }

  initMessages(){
    this.http.get('http://localhost:3000/messages')
      .map(
        (response: any) => {
          return response.obj;
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

  // storeMessages(){
  //   JSON.stringify(this.messages);
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.put('https://prj-cms.firebaseio.com/messages.json', this.getMessages())
  //     .subscribe(
  //       () => {
  //         this.messageListChangedEvent.next(this.messages.slice());
  //       }
  //     );
  // }
}

