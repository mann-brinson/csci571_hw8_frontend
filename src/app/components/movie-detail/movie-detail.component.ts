import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie_detail: object = {}
  constructor() { }

  ngOnInit() {
    console.log({"details": this.movie_detail})

  }

}
