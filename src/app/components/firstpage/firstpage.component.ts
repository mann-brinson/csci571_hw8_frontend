import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit {

  public message: string = "Passing the data"; //Can give it any type obj, etc.

  constructor() { }

  ngOnInit(): void {
  }

}
