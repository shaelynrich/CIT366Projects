import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Documents} from "../documents.model";

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Documents>();

  document: Documents[] = [
    new Documents('1', 'Document 1', 'Homework 1', 'www.asdfd','null'),
    new Documents('2', 'Document 2', 'Homework 2', 'www.asdfd','null'),
    new Documents('3', 'Document 3', 'Homework 3', 'www.asdfd','null'),
    new Documents('4', 'Document 4', 'Homework 4', 'www.asdfd','null')
  ];

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Documents){
    this.selectedDocumentEvent.emit(document);
  }
}
