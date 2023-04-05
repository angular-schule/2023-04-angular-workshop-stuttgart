import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'br-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(80)
      ]
    }),
    description: new FormControl('', { nonNullable: true }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: Validators.min(0)
    }),
  });

  private bs = inject(BookStoreService);
  private router = inject(Router);

  isInvalid(controlName: string): boolean {
    const control = this.bookForm.get(controlName);

    if (!control) {
      return false;
    }

    return control.invalid && control.touched;
  }

  hasError(controlName: string, errorCode: string): boolean {
    const control = this.bookForm.get(controlName);

    if (!control) {
      return false;
    }

    return control.hasError(errorCode) && control.touched;
  }

  submitForm() {
    const newBook: Book = this.bookForm.getRawValue();

    this.bs.create(newBook).subscribe((receivedBook) => {
      this.router.navigate(['/books', receivedBook.isbn]); // [routerLink]
      // this.router.navigateByUrl('/books'); // routerLink
    })
  }
}


/*
TODO
- Validierung
- Feedback
  - allgemeine Fehlermeldung ("ISBN ist ungültig")
  - konkrete Fehlermeldung ("zu kurz")
- Submit-Button
- abschicken
- HTTP-Request
- bei Erfolg:
  - Meldung
  - zurücksetzen
  - navigieren (Dashboard, Detailseite)

*/


