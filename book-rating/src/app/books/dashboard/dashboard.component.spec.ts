import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Book } from '../shared/book';
import { BookRatingService } from '../shared/book-rating.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {

    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [],
      providers: [
        // BRS ersetzen: Wenn Service angefordert wird, wird stattdessen der Mock ausgeliefert
        { provide: BookRatingService, useValue: ratingMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Shallow Component Test
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    // fixture.nativeElement // Host-Element
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for doRateUp', () => {
    // Arrange
    // Buch erstellen
    const book = { isbn: 'XXXXXX' } as Book; // Type Assertion

    const service = TestBed.inject(BookRatingService);
    // spyOn(service, 'rateUp').and.callFake(b => b);
    // spyOn(service, 'rateUp').and.returnValue(book);

    // rateUp überwachen: Es wird trotzdem die originale Methode rateUp aufgerufen
    spyOn(service, 'rateUp').and.callThrough();


    // Act
    component.doRateUp(book);

    // Assert
    // expect(service.rateUp).toHaveBeenCalled();
    // expect(service.rateUp).toHaveBeenCalledTimes(1);
    // expect(service.rateUp).toHaveBeenCalledWith(book);
    expect(service.rateUp).toHaveBeenCalledOnceWith(book);
  });
});
