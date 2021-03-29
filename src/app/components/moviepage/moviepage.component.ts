import { Component, OnChanges, OnInit } from '@angular/core';
import { MoviepageService } from './moviepage.service';
import { ActivatedRoute } from "@angular/router";

import { VideoItem } from './videoItem';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})

export class MoviepageComponent {

  holder = {};
  public preview_video: any = {};
  // public preview_video: VideoItem = new(...);
  // public preview_video = {} as VideoItem;

  constructor(
    private moviepageService: MoviepageService,
    private route: ActivatedRoute) { }

  // ngOnInit() {
  ngOnInit() {
    var movie_id = this.route.snapshot.paramMap.get("tmdb_id");
    // console.log({"test": movie_id});

    // Will trigger whenver the tmdb_id in route changes
    this.route.params.subscribe(routeParams => {
      // console.log({"new tmdb_id": routeParams.tmdb_id})

      this.moviepageService.getMoviepage(routeParams.tmdb_id!)
      .subscribe((data) => {

        this.holder = data;
        this.preview_video = data.video;

      })  
    })
  }


}