import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'br-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  standalone: true,
  imports: [NgFor]
})
export class RatingComponent {
  @Input() rating = 0;

  createRatings() {
    return new Array(this.rating);
  }
}
