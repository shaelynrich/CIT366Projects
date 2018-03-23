import { Component, OnInit } from '@angular/core';
import {ContactsService} from "../contacts.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {Contacts} from "../contacts.model";

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit {
  contact: Contacts = null;
  groupContacts: Contacts[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  id;
  originalContact;
  values;
  newContact;
  invalidGroupContact;

  constructor(private contactService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe (
    (params: Params) => {
      this.id = params['id'];

      if (this.id === undefined || this.id === null) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (this.originalContact === undefined || this.originalContact === null) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

       if (this.originalContact.group){
        this.groupContacts = this.originalContact.group.slice();
    }
  }
      )
}

  onSubmit(form: NgForm){
    this.values = form.value;
    this.newContact = new Contacts(this.values.id, this.values.name, this.values.email, this.values.phone, this.values.imageUrl, this.groupContacts);

    if(this.editMode === true){
      this.contactService.updateContact(this.originalContact, this.newContact)
    } else{
      this.contactService.addContact(this.newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contacts) {
    if (!newContact) {
      return true;
    }

    if (newContact.id === this.contact.id) {
      return true;
    }

    for (let i=0; i < this.groupContacts.length; i++){
      if(newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any){
    let selectedContact: Contacts = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if(idx < 0 || idx >= this.groupContacts.length)
      return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

}
