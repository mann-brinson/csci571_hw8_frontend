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
  public written_by_datetime: string[] = []

  constructor() { }

  ngOnChanges() {
    console.log({"reviews": this.reviews.length})
    this.len_reviews = this.reviews.length

    if (this.len_reviews > 0) {
      this.reviews_empty_yn = false
      
      this.reviews.forEach((review) => {
        // var date_raw = review.created_at.split('T')[0]
        var date_raw = new Date(review.created_at)
        var date_am_pm = ""
        var hours_0 = date_raw.getHours()
        var hours_1 = hours_0 % 12

        if (Math.floor(hours_0/12) == 1) {date_am_pm = "PM"}
        else {date_am_pm = "AM"}
        
        let formatted_date = `${date_raw.toLocaleString('default', { month: 'long' })} ${date_raw.getDate()}, ${date_raw.getFullYear()}, ${hours_1}:${date_raw.getMinutes()}:${date_raw.getSeconds()} ${date_am_pm}`

        console.log({"review date": formatted_date})
        // console.log(date_raw.get)
        this.written_by_datetime.push(formatted_date)

      })


    }
    
  }

}
