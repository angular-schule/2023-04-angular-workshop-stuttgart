import { TestBed } from '@angular/core/testing';

import { BookRatingService } from './book-rating.service';
import { Book } from './book';

describe('BookRatingService', () => {
  let service: BookRatingService;
  let book: Book;

  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingService);

    // Alternativ:
    // service = new BookRatingService();

    book = {
      isbn: '',
      description: '',
      title: '',
      rating: 3,
      price: 1
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {});

  it('should rate down a book by one', () => {});

  it('should not rate higher than 5', () => {});

  it('should not rate lower than 1', () => {});
});
