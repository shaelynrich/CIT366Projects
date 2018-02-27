import {MOCKDOCUMENTS} from "./MOCKDOCUMENTS";
import {Documents} from "./documents.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class DocumentsService {
  documents: Documents[] = [];
  documentSelectedEvent = new EventEmitter<Documents>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Documents[] {
    return this.documents.slice();
  }

  getContact(id: string): Documents {
    for(let document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }

}
