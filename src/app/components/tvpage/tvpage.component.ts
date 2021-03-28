import { Component, OnInit } from '@angular/core';
import { TvpageService } from './tvpage.service';

@Component({
  selector: 'app-tvpage',
  templateUrl: './tvpage.component.html',
  styleUrls: ['./tvpage.component.css']
})
export class TvpageComponent implements OnInit {

  public message: string = "Passing the data"; //Can give it any type obj, etc.

  holder = {};
  constructor(private tvpageService: TvpageService) { }

  ngOnInit() {

    this.tvpageService.getTvpage()
      .subscribe((data) => {
        console.log(data);
        this.holder = data;
      })  
  }

}
