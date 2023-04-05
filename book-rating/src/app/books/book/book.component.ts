import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book?: Book;
  @Input() min = 1;
  @Input() max = 5;
  // @Input() rateUpAllowed = false;
  // @Input() rateDownAllowed = false;

  @Output() rateUp = new EventEmitter<Book>();
  @Output() rateDown = new EventEmitter<Book>();

  @Output() deleteBook = new EventEmitter<Book>();

  /*createRatings() {
    return new Array(this.book?.rating);
  }*/

  doRateUp() {
    this.rateUp.emit(this.book);
  }

  doRateDown() {
    this.rateDown.emit(this.book);
  }

  doDelete() {
    this.deleteBook.emit(this.book);
  }
}


/*

TODO:
- Property
- Daten übergeben
- Template

*/
