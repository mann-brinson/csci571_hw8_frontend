import { Component, OnChanges, OnInit } from '@angular/core';
import { MoviepageService } from './moviepage.service';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})

export class MoviepageComponent {

  holder = {};
  public preview_video: any = {};
  public details: any = {};
  // public preview_video: VideoItem = new(...);
  // public preview_video = {} as VideoItem;

  constructor(
    private moviepageService: MoviepageService,
    private route: ActivatedRoute) { }

  // ngOnInit() {
  ngOnInit() {
    var movie_id = this.route.snapshot.paramMap.get("tmdb_id");
    console.log({"paramMap": this.route.snapshot.paramMap});

    // console.log({"current type": window.location.pathname.split("/")[2]});

    // Will trigger whenver the tmdb_id in route changes
    this.route.params.subscribe(routeParams => {
      // console.log({"new tmdb_id": routeParams.tmdb_id})

      var entity_type = window.location.pathname.split("/")[2]

      this.moviepageService.getMoviepage(routeParams.tmdb_id!, entity_type)
      .subscribe((data) => {
        // console.log({"current type": window.location.pathname.split("/")[2]});

        this.holder = data;
        this.preview_video = data.video;
        this.details = data.detail;

      })  
    })
  }


}