import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FirstpageComponent} from './components/firstpage/firstpage.component';
import { SecondpageComponent} from './components/secondpage/secondpage.component';
import { FirstChildComponent } from './components/first-child/first-child.component';
import { MylistComponent } from './components/mylist/mylist.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {
    path: 'details', 
    // component: FirstpageComponent,
    children: [
      {path: '', component: FirstpageComponent},
      {path: ':category', component: FirstChildComponent},
    
    ]
  },
  {path: 'second', component: SecondpageComponent},
  {path: 'mylist', component: MylistComponent},
  {
    path: 'watch',
    children: [
      {path: 'movie/:tmdb_id', component: FirstpageComponent},
      {path: 'tv/:tmdb_id', component: SecondpageComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
