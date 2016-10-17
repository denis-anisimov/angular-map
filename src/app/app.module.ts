import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MapComponent} from './map.component';
import {PlaceComponent} from './place.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, MapComponent, PlaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
