import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";


import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HeaderComponent } from './header/header.component';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts/contacts-detail/contacts-detail.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirective } from "./dropdown.directive";
import {ContactsService} from "./contacts/contacts.service";
import {DocumentsService} from "./documents/documents.service";
import {MessagesService} from "./messages/messages.service";
import {AppRoutingModule} from "./app.routing";
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentViewComponent } from './documents/document-view/document-view.component';
import {WindRefService} from "./wind-ref.service";
import { ContactsEditComponent } from './contacts/contacts-edit/contacts-edit.component';
import {DndModule} from "ng2-dnd";
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    HeaderComponent,
    ContactsListComponent,
    ContactsDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirective,
    DocumentEditComponent,
    DocumentViewComponent,
    ContactsEditComponent,
    ContactsFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    HttpModule
  ],
  providers: [ContactsService, DocumentsService, MessagesService, WindRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
