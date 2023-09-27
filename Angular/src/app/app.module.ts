import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonComponent } from './Components/Pokemon/Pokemon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonService } from './Service/Pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListComponent } from './Components/Pokemon/List/List.component';
import { DetailComponent } from './Components/Pokemon/Detail/Detail.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './Components/Title/Title.component';


@NgModule({
  declarations: [
    AppComponent,
      PokemonComponent,
      ListComponent,
      DetailComponent,
      TitleComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    PokemonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
