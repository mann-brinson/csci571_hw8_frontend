import { Component, Input } from '@angular/core';
import { MovieDetail } from './movieDetail';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {

  @Input() entity_type: string = ""
  @Input() movie_detail: MovieDetail = {
    name: "",
    tagline: "",
    release_year: "",
    vote_average: "",
    duration_mins: "",
    genres: [],
    spoken_languages: []
  }

  public release_year: string = ""
  public duration_hours: string = ""
  public year_rating_duration: string = ""
  public genres_str: string = ""
  public langs_str: string = ""

  constructor() { }

  ngOnChanges() {
    var movie_det = JSON.stringify(this.movie_detail)
    var movie_det_obj = JSON.parse(movie_det)

    if (this.movie_detail.name != undefined) {

      //Convert duration mins to hours
      if (movie_det_obj.runtime != 0) {
        var runtime_mins = movie_det_obj.runtime
        var hours = Math.floor(runtime_mins/60)
        var mins = runtime_mins % 60

        if (hours != 0) {
          this.duration_hours = `${hours}hrs ${mins}mins`
        } else {
          this.duration_hours = `${mins}mins`
        }
        console.log({"duration_new": this.duration_hours})
      }

      // Parse release_date differently based on 'movie' or 'tv'
      if (this.entity_type == "movie") {
        this.release_year = movie_det_obj.release_date.split('-')[0]
      }
      else if (this.entity_type == "tv") {
        this.release_year = movie_det_obj.first_air_date.split('-')[0]
      }

      // Concatenate release_year + vote_average + duration_hours
      var holder = []
      if (this.release_year != "") {holder.push(this.release_year)}
      if (movie_det_obj.vote_average != 0) {holder.push(`★ ${movie_det_obj.vote_average.toString()}`)}
      if (movie_det_obj.runtime != 0) {holder.push(this.duration_hours)}
      this.year_rating_duration = holder.join(' | ')
      console.log(this.year_rating_duration)

      //Unwrap the genres into a string
      if (movie_det_obj.genres.length != 0) {
        this.genres_str = movie_det_obj.genres.join(', ')
      }

      //Unwrap languages into a string
      if (movie_det_obj.spoken_languages.length != 0) {
        this.langs_str = movie_det_obj.spoken_languages.join(', ')
      }
    }

  }
}
