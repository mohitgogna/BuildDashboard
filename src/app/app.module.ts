import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BuildsComponent } from './module/builds/builds.component';
import { ModuleService } from './module/module.service';
import { HttpClientModule } from '@angular/common/http';
import { JobsComponent } from './module/jobs/jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildsComponent,
    JobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ModuleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
