import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }     from './app-routing.module';

import { SpinnerService } from './spinner/service/spinner.service';
import { ErrorService } from './error/service/error.service';

import { FocusDirective } from './shared/view/focus.directive';
import { NotBlankDirective } from './shared/validation/notblank.directive';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroService } from './heroes/service/hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './heroes/hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    ErrorComponent,
    FocusDirective,
    NotBlankDirective,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ SpinnerService, ErrorService, HeroService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
