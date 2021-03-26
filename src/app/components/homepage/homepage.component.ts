import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {



  readonly ROOT_URL = "http://localhost:8080/";
  posts: any;
  constructor(private http: HttpClient) {}
  getPosts() {
      this.posts = this.http.get(this.ROOT_URL)
  }

}
