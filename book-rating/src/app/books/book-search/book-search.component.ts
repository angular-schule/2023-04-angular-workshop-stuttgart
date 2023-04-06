import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, concatMap, debounceTime, delay, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';

@Component({
  selector: 'br-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });
  books$: Observable<Book[]>;

  loading = false;

  constructor(private bs: BookStoreService) {
    this.books$ = this.searchControl.valueChanges.pipe(
      filter(e => e.length >= 3),
      tap(() => this.loading = true),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => this.bs.search(term).pipe(delay(1000))),
      tap(() => this.loading = false),
    );
  }
}
