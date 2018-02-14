import { Component, OnInit } from '@angular/core';
import {Documents} from "./documents.model";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  //document: Documents;
  selectedDocument: Documents;

  constructor() { }

  ngOnInit() {
  }

}
