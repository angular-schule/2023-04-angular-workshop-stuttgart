import { Component } from '@angular/core';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { BookStoreService } from '../shared/book-store.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  books: Book[] = [];

  constructor(private rs: BookRatingService, private bs: BookStoreService) {
    this.bs.getAll().subscribe(books => {
      this.books = books;
    });
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  doDelete(book: Book) {
    this.bs.delete(book.isbn).subscribe(() => {
      this.bs.getAll().subscribe(books => {
        this.books = books;
      });

      // this.books = this.books.filter(b => book.isbn !== b.isbn);
    });
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10) // [10,20,30,40,50]
    // [1,2,3,4,5].filter(e => e < 3) // [1,2]

    this.books = this.books.map(b => {
      if (ratedBook.isbn === b.isbn) {
        return ratedBook;
      }

      return b;
    })
  }
}



