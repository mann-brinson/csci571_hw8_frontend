import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomepageService } from './homepage.service';
import { HomeObj } from './homeobj';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

// WORKING
// export class HomepageComponent {
//   readonly ROOT_URL = "http://localhost:8080/";

//   posts2: object = {"test": 1, "food": "apple"};

//   movie_lists = [];
//   tv_lists = [];

  // ATTEMPT 1
  // data = {};
  // data: Observable<HomeObj>;
  // constructor(private http: HttpClient) {
  //   this.data = this.http.get<HomeObj>(this.ROOT_URL)

  //   console.log(this.data); //Test
  //   console.log(typeof this.data)
  // }

  // ATTEMPT 2
  // posts: any;
  // getPosts() {
  //     this.posts = this.http.get(this.ROOT_URL)
  // }

  // holder = {};
  // ATTEMPT 3
  // constructor(private homepageService: HomepageService) {
  //   this.homepageService.getHomepage()
  //     .subscribe(
  //       (data: HomeObj) => this.holder = { ...data }
  //     );

  //   console.log(this.holder);
  // }
// }

// ATTEMPT 4
export class HomepageComponent implements OnInit {

  holder = {};

  constructor(private homepageService: HomepageService) { }

  ngOnInit() {

    this.homepageService.getHomepage()
      .subscribe((data) => {
        console.log(data);
        this.holder = data;
      })  
  }

}

