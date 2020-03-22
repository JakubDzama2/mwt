import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsMenuComponent } from './films-menu/films-menu.component';
import { FilmEditComponent } from './film-edit/film-edit.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { MaterialModule } from 'src/app/material.module';
import { LudiaToStringPipe } from 'src/pipes/ludia-to-string.pipe';
import { PostavyToStringPipe } from '../../pipes/postavy-to-string.pipe';


@NgModule({
  declarations: [FilmsMenuComponent, FilmEditComponent, FilmsListComponent, FilmDetailComponent, LudiaToStringPipe, PostavyToStringPipe],
  imports: [
    CommonModule,
    MaterialModule,
    FilmsRoutingModule
  ]
})
export class FilmsModule { }
