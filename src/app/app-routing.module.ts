import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictDataComponent } from './district-data/district-data.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StatesComponent } from './states/states.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'district', component: DistrictDataComponent },
  { path: 'states', component: StatesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
