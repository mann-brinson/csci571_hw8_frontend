import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonpageComponent } from './components/commonpage/commonpage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FirstChildComponent } from './components/first-child/first-child.component';

import { HomepageService } from './components/homepage/homepage.service';
import { HomepageComponent } from './components/homepage/homepage.component';

import { MoviepageService } from './components/moviepage/moviepage.service';
import { MoviepageComponent } from './components/moviepage/moviepage.component';

import { TvpageService } from './components/tvpage/tvpage.service';
import { TvpageComponent } from './components/tvpage/tvpage.component';

import { MylistComponent } from './components/mylist/mylist.component';
import { MultiItemCarouselComponent } from './components/multi-item-carousel/multi-item-carousel.component';
import { TypeaheadComponent } from './components/typeahead/typeahead.component';
import { FormsModule } from '@angular/forms';

// import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';

// import { NgbdCarouselModule } from './components/bootstrap/carousel/carousel.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CommonpageComponent,
    NavBarComponent,
    FirstChildComponent,
    MylistComponent,
    MoviepageComponent,
    TvpageComponent,
    MultiItemCarouselComponent,
    TypeaheadComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [HomepageService, MoviepageService, TvpageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
