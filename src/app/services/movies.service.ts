import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespMovieDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    constructor(private http: HttpClient) { }

    getFeature() {

        // tslint:disable-next-line: max-line-length
        return this.http.get<RespMovieDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-08-30&api_key=e50e9b6b173e52df1ae08cc0e18bc903&language=es&include_image_language=es`);
    }
}
