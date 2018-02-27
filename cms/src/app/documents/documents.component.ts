import { Component, OnInit } from '@angular/core';
import {Documents} from "./documents.model";
import {DocumentsService} from "./documents.service";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  //document: Documents;
  selectedDocument: Documents;

  constructor(private documentService: DocumentsService) { }

  ngOnInit() {
    this.documentService.documentSelectedEvent
      .subscribe(
        (document: Documents) => {
          this.selectedDocument = document;
    }
      );
  }

}
