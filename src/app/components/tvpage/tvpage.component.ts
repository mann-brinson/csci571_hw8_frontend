import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tvpage',
  templateUrl: './tvpage.component.html',
  styleUrls: ['./tvpage.component.css']
})
export class TvpageComponent implements OnInit {

  public message: string = "Passing the data"; //Can give it any type obj, etc.

  constructor() { }

  ngOnInit(): void {
  }

}
