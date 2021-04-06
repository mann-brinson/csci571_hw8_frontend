import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public title: string = "USC Films"

  public collapsed: boolean = true
  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapsed(): void {
    console.log("click")
    this.collapsed = !this.collapsed
  }

}
