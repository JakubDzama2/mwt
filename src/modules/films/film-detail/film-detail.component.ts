import { Component, OnInit, Input } from '@angular/core';
import { Film } from 'src/entities/film';
import { FilmsServerService } from 'src/services/films-server.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {

  @Input() public film: Film; // = new Film("12", 2000);
  apiResponse = new OmdbApiResponse(); // = "https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png";

  constructor(private filmsServerService: FilmsServerService) { }

  ngOnInit(): void {
    this.filmsServerService.getOmdbFilmInfo(this.film.nazov).subscribe((apiResponse: OmdbApiResponse) => {
      this.apiResponse = apiResponse;
    })
  }



}

export class OmdbApiResponse {
  Poster: string = "https://stockpictures.io/wp-content/uploads/2020/01/image-not-found-big-768x432.png";
  Plot: string = "unknown plot";
  Genre: string = "unknown genre";
  Runtime: string = "? min";
}