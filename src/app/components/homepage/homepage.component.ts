import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

// WORKING
export class HomepageComponent implements OnInit {

  holder = {};
  movies_now_playing = [];
  constructor(private homepageService: HomepageService) { }

  ngOnInit() {

    this.homepageService.getHomepage()
      .subscribe((data) => {
        console.log(data.head.now_playing);
        this.holder = data;
        this.movies_now_playing = data.head.now_playing;

        // head_movies = data.head
      })  
  }

}

