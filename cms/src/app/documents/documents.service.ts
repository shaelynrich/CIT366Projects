import {MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Document} from "./document.model";
import {EventEmitter, Injectable} from "@angular/core";
import { Subject } from 'rxjs/Subject';
import {HttpClient} from "@angular/common/http";
import {Http} from "@angular/http";
import {Response} from "@angular/http";
import 'rxjs/add/operator/map';
import {Headers} from "@angular/http";

@Injectable()
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxId: number;
  currentId;
  maxDocumentId: number;
  documentsListClone;


  constructor(private http: Http) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
    this.initDocuments();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
    //return this.http.get();
  }

  getDocument(id: string): Document {
    for(let document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(this.documentsListClone);
    this.storeDocuments();
  }

  getMaxId(): number{
    this.maxId = 0;
    for (let document of this.documents) { //each document in the documents list
         this.currentId = parseInt(document.id); //convert document.id into a number
            if (this.currentId > this.maxId) { //   if currentId > maxId then
              this.maxId = this.currentId;//     maxId = current ID
            }
    }
     return this.maxId;
  }

  addDocument(newDocument: Document) {
    if(newDocument === undefined || newDocument === null){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(this.documentsListClone);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if (originalDocument === undefined || originalDocument === null || newDocument === undefined || newDocument === null) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(this.documentsListClone);
    this.storeDocuments();
  }

    initDocuments(){
    this.http.get('https://prj-cms.firebaseio.com/documents.json')
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .subscribe(
        (documentsReturned: Document[]) => {
          this.documents = documentsReturned;
          this.maxDocumentId = this.getMaxId();
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
    }

    storeDocuments(){
      JSON.stringify(this.documents);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('https://prj-cms.firebaseio.com/documents.json', this.getDocuments())
        .subscribe(
          () => {
            this.documentListChangedEvent.next(this.documents.slice());
          }
        );
    }
 }
