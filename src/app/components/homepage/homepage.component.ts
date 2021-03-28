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
  constructor(private homepageService: HomepageService) { }

  ngOnInit() {

    this.homepageService.getHomepage()
      .subscribe((data) => {
        console.log(data);
        this.holder = data;
      })  
  }

}

