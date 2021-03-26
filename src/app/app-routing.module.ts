import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FirstpageComponent} from './components/firstpage/firstpage.component';
import { SecondpageComponent} from './components/secondpage/secondpage.component'

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'first', component: FirstpageComponent},
  {path: 'second', component: SecondpageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
