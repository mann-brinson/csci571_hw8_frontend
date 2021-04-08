import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; 

import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { HomepageService } from './components/homepage/homepage.service';
import { HomepageComponent } from './components/homepage/homepage.component';

import { MoviepageService } from './components/moviepage/moviepage.service';
import { MoviepageComponent } from './components/moviepage/moviepage.component';

import { MylistComponent } from './components/mylist/mylist.component';
import { MultiItemCarouselComponent } from './components/multi-item-carousel/multi-item-carousel.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { FormsModule } from '@angular/forms';

import { YoutubeModule } from './components/youtube/youtube.module';

import { LocalStorageComponent } from './components/local-storage/local-storage.component';
import { LocalStorageService } from './components/local-storage/local-storage.service';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CastListComponent } from './components/cast-list/cast-list.component';
import { CastItemFullService } from './components/cast-modal/castItem.service';
import { CastModalComponent, CastModalContent } from './components/cast-modal/cast-modal.component';
import { MovieReviewsComponent } from './components/movie-reviews/movie-reviews.component';
import { ResizeService } from './components/homepage/resize.service';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent,
    MylistComponent,
    MoviepageComponent,
    MultiItemCarouselComponent,
    TypeaheadComponent,
    LocalStorageComponent,
    MovieDetailComponent,
    CastListComponent,
    CastModalComponent,
    CastModalContent,
    MovieReviewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    YoutubeModule,
    FontAwesomeModule,
    CommonModule,
    LayoutModule
  ],
  providers: [
    HomepageService, 
    MoviepageService, 
    LocalStorageService,
    CastItemFullService,
    CastModalComponent,
    ResizeService, 
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
