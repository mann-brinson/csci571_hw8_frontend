import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-commonpage',
  templateUrl: './commonpage.component.html',
  styleUrls: ['./commonpage.component.css']
})
export class CommonpageComponent implements OnInit {
  @Input() dataReceived:string = "DefaultValue!";
  @Input() test:object = {};

  constructor() { }

  ngOnInit(): void {
  }

}
