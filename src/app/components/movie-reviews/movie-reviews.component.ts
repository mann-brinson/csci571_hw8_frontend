import { Component, Input, OnInit } from '@angular/core';
import { ReviewItem } from './reviewItem';

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css']
})
export class MovieReviewsComponent {

  @Input() reviews: Array<ReviewItem> = []

  public len_reviews: number = 0
  public reviews_empty_yn: boolean = true

  constructor() { }

  ngOnChanges() {
    console.log({"reviews": this.reviews.length})
    this.len_reviews = this.reviews.length

    if (this.len_reviews > 0) {
      this.reviews_empty_yn = false
    }
    
  }

}
