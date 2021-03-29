import { Component, OnInit } from '@angular/core';
import { TvpageService } from './tvpage.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tvpage',
  templateUrl: './tvpage.component.html',
  styleUrls: ['./tvpage.component.css']
})
export class TvpageComponent {

  public message: string = "Passing the data"; //Can give it any type obj, etc.

  holder = {};
  constructor(
    private tvpageService: TvpageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var tv_id = this.route.snapshot.paramMap.get("tmdb_id");

    // Will trigger whenver the tmdb_id in route changes
    this.route.params.subscribe(routeParams => {
      console.log({"new tmdb_id": routeParams.tmdb_id})

      this.tvpageService.getTvpage(routeParams.tmdb_id!)
      .subscribe((data) => {
        this.holder = data;
      })  
    })
  }

}
