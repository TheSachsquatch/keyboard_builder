import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgIconsModule} from '@ng-icons/core';
import { HeroPencilAlt, HeroChevronDown, HeroChevronUp, HeroSearchCircle, HeroArrowCircleLeft, HeroSave, HeroXCircle, HeroInformationCircle, HeroExclamationCircle} from '@ng-icons/heroicons/outline';
import {SimpleGoogle, SimpleGithub} from '@ng-icons/simple-icons'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildTabComponent } from './build-tab/build-tab.component';
import { SavedBuildsComponent } from './saved-builds/saved-builds.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component'
import {CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { SavedCompComponent } from './saved-comp/saved-comp.component';
@NgModule({
  declarations: [
    AppComponent,
    BuildTabComponent,
    SavedBuildsComponent,
    SearchComponent,
    RegisterComponent,
    HomeComponent,
    SavedCompComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgIconsModule.withIcons({HeroPencilAlt, HeroChevronDown, HeroChevronUp, HeroSearchCircle, HeroArrowCircleLeft, HeroSave, SimpleGoogle
    ,HeroExclamationCircle, HeroXCircle, HeroInformationCircle, SimpleGithub}),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
