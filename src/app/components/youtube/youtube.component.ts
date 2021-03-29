import { Component, Input, OnInit } from '@angular/core';
import { VideoItem } from 'src/app/components/moviepage/videoItem';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent {

  @Input() video_data = {} as VideoItem;

  constructor() { }

  ngOnChanges() {
    if ("key" in this.video_data) {
      console.log("creating youtube vid");
      console.log(this.video_data);
      const tag = document.createElement('script');
  
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }

}
