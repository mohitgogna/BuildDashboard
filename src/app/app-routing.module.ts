import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildsComponent } from './module/builds/builds.component';
import { JobsComponent } from './module/jobs/jobs.component';


const routes: Routes = [
  { path: 'builds', component: BuildsComponent },
  { path: 'jobs', component: JobsComponent },
  //{ path: 'jobs/:url', component: JobsComponent },
  { path: '', component: BuildsComponent },
  //{ path: '', redirectTo: '/builds', pathMatch: 'full' }, // redirect to `builds`
  { path: '**', component: BuildsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
