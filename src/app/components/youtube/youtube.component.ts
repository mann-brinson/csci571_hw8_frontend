import { Component, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { VideoItem } from 'src/app/components/moviepage/videoItem';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent {
  @ViewChild('YouTubePlayer') YouTubePlayer?: ElementRef<HTMLDivElement>;

  @Input() video_data = {} as VideoItem;
  videoWidth: number | undefined
  videoHeight: number | undefined

  constructor(private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnChanges() {
    if ("key" in this.video_data) {
      // console.log("creating youtube vid");
      // console.log(this.video_data);
      const tag = document.createElement('script');
  
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = (): void => {
    // Automatically expand the video to fit the page up to 1000px width
    this.videoWidth = Math.min(this.YouTubePlayer!.nativeElement.clientWidth, 1000);
    this.videoHeight = this.videoWidth * 0.6;
    this._changeDetectorRef.detectChanges();
  }

}
