import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsMenuComponent } from './films-menu/films-menu.component';
import { FilmEditComponent } from './film-edit/film-edit.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';


const filmsRoutes: Routes = [
  {
    path: '',
    component: FilmsMenuComponent,
    children: [
      {
        path: 'edit/:id',
        component: FilmEditComponent
      },
      {
        path: '',
        component: FilmsListComponent
      }]
  }];

@NgModule({
  imports: [RouterModule.forChild(filmsRoutes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
