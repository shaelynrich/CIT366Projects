import {Component, OnInit} from '@angular/core';
import {Document} from '../document.model';
import {DocumentsService} from "../documents.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {WindRefService} from "../../wind-ref.service";

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(private documentService: DocumentsService,
              private router: Router,
              private route: ActivatedRoute,
              private windowRefService: WindRefService) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  onView(){
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(){
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'])
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.document = this.documentService.getDocument(this.id);
        }
      );
  }

}
