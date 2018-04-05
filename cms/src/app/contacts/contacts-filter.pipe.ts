import { Pipe, PipeTransform } from '@angular/core';
import {Contacts} from "./contacts.model";

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contacts[], [term]): any {
    let filteredArray: Contacts[] = [];

    filteredArray = contacts.filter(
      (contact: any) => contact.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredArray.length < 1) {
      return contacts;
    }

    return filteredArray;
  }

}
