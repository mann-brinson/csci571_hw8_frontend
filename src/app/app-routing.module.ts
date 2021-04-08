import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

import { MylistComponent } from './components/mylist/mylist.component';
import { MoviepageComponent } from './components/moviepage/moviepage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'mylist', component: MylistComponent},
  {
    path: 'watch',
    children: [
      {path: 'movie/:tmdb_id', component: MoviepageComponent},
      {path: 'tv/:tmdb_id', component: MoviepageComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
