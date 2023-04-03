import { Component, Input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book?: Book;
  @Input() index: number = 0;

  /*createRatings() {
    return new Array(this.book?.rating);
  }*/
}


/*

TODO:
- Property
- Daten übergeben
- Template

*/
