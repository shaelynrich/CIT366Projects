import { Component, OnInit, Input } from '@angular/core';
import {Contacts} from "../contacts.model";
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  id: string;
  contact: Contacts;

  constructor(private contactService: ContactsService,
              private router: Router,
              private route: ActivatedRoute,) { }


  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe();

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        }
      );
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

}
