import { Routes, RouterModule } from '@angular/router';
import {DocumentsComponent} from "./documents/documents.component";
import {MessagesComponent} from "./messages/messages.component";
import {ContactsComponent} from "./contacts/contacts.component";
import { NgModule } from '@angular/core';
import {DocumentEditComponent} from "./documents/document-edit/document-edit.component";
import {DocumentDetailComponent} from "./documents/document-detail/document-detail.component";
import {ContactsDetailComponent} from "./contacts/contacts-detail/contacts-detail.component";
import {ContactsEditComponent} from "./contacts/contacts-edit/contacts-edit.component";


const app_Routes: Routes = [
  {path: '', redirectTo: '/documents', pathMatch: 'full'},
  {path: 'documents', component: DocumentsComponent, children: [
      {path: 'new', component: DocumentEditComponent},
      {path: ':id', component: DocumentDetailComponent},
      {path: ':id/edit', component: DocumentEditComponent},
    ]},
  {path: 'messages', component: MessagesComponent},
  {path: 'contacts', component: ContactsComponent, children: [
      {path: 'new', component: ContactsEditComponent},
      {path: ':id', component: ContactsDetailComponent},
      {path: ':id/edit', component: ContactsEditComponent},
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(app_Routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}