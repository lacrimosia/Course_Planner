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
import { DownloadComponent } from './download/download.component';
import { ErrorComponent } from './error/error.component';
import { SavedComponent } from './saved/saved.component';
import { ButtonAComponent } from './button-a/button-a.component';
import { ButtonBComponent } from './button-b/button-b.component';
import { TasksComponent } from './tasks/tasks.component';
import { TwoTasksComponent } from './two-tasks/two-tasks.component';
import { OneTaskComponent } from './one-task/one-task.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { InformationComponent } from './information/information.component';
import { MenuComponent } from './menu/menu.component';
import { PreviousComponent } from './previous/previous.component';
import { NextComponent } from './next/next.component';
import { HeadingComponent } from './heading/heading.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    NavComponent,
    KeysPipe,
    PrintComponent,
    DownloadComponent,
    ErrorComponent,
    SavedComponent,
    ButtonAComponent,
    ButtonBComponent,
    TasksComponent,
    TwoTasksComponent,
    OneTaskComponent,
    InstructionsComponent,
    InformationComponent,
    MenuComponent,
    PreviousComponent,
    NextComponent,
    HeadingComponent,
    TooltipComponent
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
