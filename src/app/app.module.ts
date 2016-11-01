import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { NavComponent } from './nav/nav.component';
import { KeysPipe } from './keys.pipe';

import {HotkeyModule} from 'angular2-hotkeys';
import { PrintComponent } from './print/print.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    NavComponent,
    KeysPipe,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HotkeyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
