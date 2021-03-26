import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-first-child',
  templateUrl: './first-child.component.html',
  styleUrls: ['./first-child.component.css']
})
export class FirstChildComponent implements OnInit {
  public category:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = this.route.snapshot.paramMap.get('category')
  }

}
