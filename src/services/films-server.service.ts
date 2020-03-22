import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Film } from 'src/entities/film';
import { Observable } from 'rxjs';
import { UsersServerService } from './users-server.service';
import { OmdbApiResponse } from 'src/modules/films/film-detail/film-detail.component';

@Injectable({
  providedIn: 'root'
})
export class FilmsServerService {

  url = "http://localhost:8080/films";
  omdbUrl = "http://www.omdbapi.com/"
  apiKey = "637183e4";

  constructor(private http: HttpClient, private usersServerService: UsersServerService) { }

  get token() {
    return this.usersServerService.token;
  }

  private getHeader(): {
    headers?: { "X-Auth-Token": string };
    params?: HttpParams
  } {
    return this.token ? { headers: { "X-Auth-Token": this.token } } : undefined
  }

  getFilms(indexFrom?: number, indexTo?: number, search?: string, orderBy?: string, descending?: boolean): Observable<FilmsResponse> {
    let httpOptions = this.getHeader();
    if (indexFrom || indexTo || search || orderBy || descending) {
      httpOptions = { ...(httpOptions || {}), params: new HttpParams() }
    }
    if (indexFrom) {
      httpOptions.params = httpOptions.params.set("indexFrom", "" + indexFrom);
    }
    if (indexTo) {
      httpOptions.params = httpOptions.params.set("indexTo", "" + indexTo);
    }
    if (search) {
      httpOptions.params = httpOptions.params.set("search", search);
    }
    if (orderBy) {
      httpOptions.params = httpOptions.params.set("orderBy", orderBy);
    }
    if (descending) {
      httpOptions.params = httpOptions.params.set("descending", ""+descending);
    }
    return this.http.
      get<FilmsResponse>(this.url, httpOptions)
  }

  getOmdbFilmInfo(nazov: string): Observable<OmdbApiResponse> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set("t", nazov);
    httpParams = httpParams.set("plot", "full");
    httpParams = httpParams.set("apikey", this.apiKey);
    return this.http.get<OmdbApiResponse>(this.omdbUrl, {params: httpParams})
  }

}

export interface FilmsResponse {
  items: Film[];
  totalCount: number;
}