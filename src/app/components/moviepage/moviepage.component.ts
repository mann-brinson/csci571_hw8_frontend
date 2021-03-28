import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {

  public message: string = "Passing the data"; //Can give it any type obj, etc.

  constructor() { }

  ngOnInit(): void {
  }

}