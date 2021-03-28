import { Component, OnInit } from '@angular/core';
import { MoviepageService } from './moviepage.service';


@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {

  public message: string = "Passing the data"; //Can give it any type obj, etc.

  holder = {};
  constructor(private moviepageService: MoviepageService) { }

  ngOnInit() {

    this.moviepageService.getMoviepage()
      .subscribe((data) => {
        console.log(data);
        this.holder = data;
      })  
  }

}