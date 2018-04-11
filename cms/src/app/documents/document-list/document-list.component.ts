import {Component, OnInit} from '@angular/core';
import {Document} from "../document.model";
import {DocumentsService} from "../documents.service";
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  private subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentsService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
       this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
            this.documents = documentsList;
        }
      );
  }
}
