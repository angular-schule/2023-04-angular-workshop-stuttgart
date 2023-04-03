import { Component, Input } from '@angular/core';

@Component({
  selector: 'br-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() rating = 0;

  createRatings() {
    return new Array(this.rating);
  }
}
