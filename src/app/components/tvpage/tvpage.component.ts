import { Component, OnInit } from '@angular/core';
import { TvpageService } from './tvpage.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tvpage',
  templateUrl: './tvpage.component.html',
  styleUrls: ['./tvpage.component.css']
})
export class TvpageComponent implements OnInit {

  public message: string = "Passing the data"; //Can give it any type obj, etc.

  holder = {};
  constructor(
    private tvpageService: TvpageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    var tv_id = this.route.snapshot.paramMap.get("tmdb_id");

    this.tvpageService.getTvpage(tv_id!)
      .subscribe((data) => {
        console.log(data);
        this.holder = data;
      })  
  }

}
