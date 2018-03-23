import {MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Document} from "./document.model";
import {EventEmitter, Injectable} from "@angular/core";
import { Subject } from 'rxjs/Subject';


@Injectable()
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxId: number;
  currentId;
  maxDocumentId: number;
  documentsListClone;


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
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
    // let tmpDocuments: Document[] = [];
    // const docsLength = this.documents.length;
    // for (let i=0; i < pos; i++) {
    //   tmpDocuments.push(this.documents[i]);
    // }
    // for (let j=pos+1; j< docsLength; j++) {
    //   tmpDocuments.push(this.documents[j]);
    // }

   // this.documentsListClone = tmpDocuments;
    this.documents.splice(pos, 1);
     //this.documents = this.documents.splice(pos, 1);
     this.documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(this.documentsListClone);
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
    this.documentListChangedEvent.next(this.documentsListClone);
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
    this.documentListChangedEvent.next(this.documentsListClone);
  }
}
