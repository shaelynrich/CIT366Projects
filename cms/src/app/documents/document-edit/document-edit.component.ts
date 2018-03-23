import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../documents.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Document} from "../document.model";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  document: Document;
  originalDocument: Document;
  editMode: boolean = false;
  values;
  newDocument;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe (
        (params: Params) => {
          this.id = params['id'];
          if (this.id === undefined || this.id === null) {
            this.editMode = false;
            return;
          }
          this.originalDocument = this.documentService.getDocument(this.id);
          if (this.originalDocument === undefined || this.originalDocument === null) {
            return;
          }
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      )
  }

  onSubmit(form: NgForm){
    this.values = form.value;

    this.newDocument = new Document(this.values.id, this.values.name, this.values.description, this.values.url, this.values.children);

     if (this.editMode === true) {
       this.documentService.updateDocument(this.originalDocument, this.newDocument)
     } else {
       this.documentService.addDocument(this.newDocument);
     }
    this.router.navigate(['/documents']);
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }

}
