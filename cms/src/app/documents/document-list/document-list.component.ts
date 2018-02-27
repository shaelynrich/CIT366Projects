import {Component, OnInit} from '@angular/core';
import {Documents} from "../documents.model";
import {DocumentsService} from "../documents.service";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  document: Documents[] = [];

  constructor(private documentService: DocumentsService) {
    this.document = this.documentService.getDocuments();
  }

  ngOnInit() {
  }

  onSelectedDocument(document: Documents){
    this.documentService.documentSelectedEvent.emit(document);
  }
}
