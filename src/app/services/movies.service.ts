import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespMovieDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

    private popularesPage = 0;

    generos: Genre[] = [];

    constructor(private http: HttpClient) { }

    private ejecutarQuery<T>( query: string ) {

        query = `${ URL }${query}`;

        query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

        return this.http.get<T>( query );

    }

    getFeature() {

        // tslint:disable-next-line: max-line-length
        // return this.http.get<RespMovieDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2019-08-30&api_key=e50e9b6b173e52df1ae08cc0e18bc903&language=es&include_image_language=es`);

        const hoy = new Date();

        /**
         * obtengo la fecha del mes siguiente, pero quiero el primer dia de ese mes con el 0 se hace eso
         */
        const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();

        const mes = hoy.getMonth() + 1;

        let mesString;

        if ( mes < 10) {
            mesString = '0' + mes;
        } else {
            mesString = mes;
        }

        /**
         * construyendo la fehca de este modo 2019-01-01
         */
        const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
        const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;

        return this.ejecutarQuery<RespMovieDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
    }

    getPopulares() {

        this.popularesPage++;

        const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

        return this.ejecutarQuery<RespMovieDB>( query );
    }

    getPeliculaDetalle( id: string ) {

        const query = `/movie/${id}?a=1`;

        return this.ejecutarQuery<PeliculaDetalle>( query );
    }

    getActoresPelicula( id: string ) {

        const query = `/movie/${id}/credits?a=1`;

        return this.ejecutarQuery<RespuestaCredits>( query );
    }

    buscarPelicula( texto: string ) {

        const query = `/search/movie?query=${ texto }`;

        return this.ejecutarQuery<RespMovieDB>( query );
    }

    cargarGeneros(): Promise<Genre[]> {

        return new Promise ( resolve => {

            const query = `/genre/movie/list?a=1`;

            this.ejecutarQuery( query ).subscribe(
                resp => {
                    this.generos = resp['genres'];
                    resolve( this.generos );
                }
            );
        } );
    }
}
