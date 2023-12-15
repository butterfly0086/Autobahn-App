import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HighwaysListComponent } from './components/highways-list/highways-list.component';
import { MapViewComponent } from './components/map-view/map-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/highways', pathMatch: 'full' },
  { path: 'highways', component: HighwaysListComponent },
  { path: 'map/:roadworkId', component: MapViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
