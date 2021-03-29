import { Component, OnInit } from '@angular/core';
import { MoviepageService } from './moviepage.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {

  // public message: string = "Passing the data !!!"; //Can give it any type obj, etc.
  public test: object = {"test": 1, "apple": 2};
  // public movie_id: string = "";

  holder = {};
  constructor(
    private moviepageService: MoviepageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var movie_id = this.route.snapshot.paramMap.get("tmdb_id");
    console.log({"test": movie_id});

    this.moviepageService.getMoviepage(movie_id!)
      .subscribe((data) => {
        console.log(data);
        this.holder = data;
      })  
  }

}