import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Contacts} from '../contacts.model';


@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input()contact: Contacts;
  @Output()contactSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.contactSelected.emit();
  }
}
