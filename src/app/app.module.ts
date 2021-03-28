import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
// import { SecondpageComponent } from './components/secondpage/secondpage.component';
import { CommonpageComponent } from './components/commonpage/commonpage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FirstChildComponent } from './components/first-child/first-child.component';
import { HomepageService } from './components/homepage/homepage.service';
import { MylistComponent } from './components/mylist/mylist.component';
import { MoviepageComponent } from './components/moviepage/moviepage.component';
import { TvpageComponent } from './components/tvpage/tvpage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CommonpageComponent,
    NavBarComponent,
    FirstChildComponent,
    MylistComponent,
    MoviepageComponent,
    TvpageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [HomepageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
