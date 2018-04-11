import {Document} from "./document.model";
import {EventEmitter, Injectable} from "@angular/core";
import { Subject } from 'rxjs/Subject';
import {HttpHeaders, HttpClient, HttpResponse} from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class DocumentsService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  maxId: number;
  currentId;
  maxDocumentId: number;


  constructor(private http: HttpClient) {
    this.initDocuments();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for(let document of this.documents){
      if (document.id == id){
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if(!document) {
      return;
    }

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .map(
        (response: any) => {
          return response.obj;
        })
    .subscribe(
      (documents: Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }

  getMaxId(): number{
    this.maxId = 0;
    for (let document of this.documents) {
         this.currentId = parseInt(document.id);
            if (this.currentId > this.maxId) {
              this.maxId = this.currentId;
            }
    }
     return this.maxId;
  }

  addDocument(document: Document) {
    if(!document) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    document.id = '';
    const strDocument = JSON.stringify(document);

    this.http.post('http://localhost:3000/documents', strDocument, {headers: headers})
      .map(
        (response: any) => {
          return response.obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

  updateDocument(originalDocument: Document, newDocument: Document){
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const strDocument = JSON.stringify(newDocument);

    this.http.patch('http://localhost:3000/documents/' + originalDocument.id
                          , strDocument
                          , {headers: headers})
      .map(
        (response: any) => {
          return response.obj;
        })
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.documentListChangedEvent.next(this.documents.slice());
        });
  }

    initDocuments(){
    this.http.get('http://localhost:3000/documents')
      .map(
        (response: any) => {
          return response.obj;
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

    // storeDocuments(){
    //   JSON.stringify(this.documents);
    //   const headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   return this.http.put('https://prj-cms.firebaseio.com/documents.json', this.getDocuments())
    //     .subscribe(
    //       () => {
    //         this.documentListChangedEvent.next(this.documents.slice());
    //       }
    //     );
    // }
 }
