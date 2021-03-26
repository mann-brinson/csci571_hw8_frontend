import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FirstpageComponent } from './components/firstpage/firstpage.component';
import { SecondpageComponent } from './components/secondpage/secondpage.component';
import { CommonpageComponent } from './components/commonpage/commonpage.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FirstChildComponent } from './components/first-child/first-child.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    FirstpageComponent,
    SecondpageComponent,
    CommonpageComponent,
    NavBarComponent,
    FirstChildComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
