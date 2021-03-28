import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';
import { MovieTvItem } from './movieTvItem';

// import { NgbdCarouselModule } from 'components/bootstrap/carousel/carousel.module';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  holder = {};
  // movies = [];
  movies: MovieTvItem[] = [];
  // movies: MovieTvItem[];

  constructor(private homepageService: HomepageService) { }

  ngOnInit() {

    this.homepageService.getHomepage()
      .subscribe((data) => {
        // console.log(data.head.now_playing[0].id);
        console.log(data.head.now_playing);
        this.holder = data;
        this.movies = data.head.now_playing;



        // head_movies = data.head
      })  
  }


}

