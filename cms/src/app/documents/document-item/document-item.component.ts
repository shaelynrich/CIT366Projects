import {Component, Input, OnInit} from '@angular/core';
import {Documents} from "../documents.model";

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input()document: Documents;

  constructor() { }

  ngOnInit() {
  }

}
