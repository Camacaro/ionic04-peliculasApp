import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

interface FavoritoGenero {
    genero: string;
    peliculas: PeliculaDetalle[];
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

    peliculas: PeliculaDetalle[] = [];

    generos: Genre[] = [];

    // favoritoGenero: any[] = [
    //     {
    //         genero: 'Accion',
    //         peliculas: []
    //     }
    // ];

    favoritoGenero: FavoritoGenero[] = [];

    constructor( private dataLocalService: DataLocalService,
                 private moviesService: MoviesService) {}

    async ngOnInit() {
        // this.peliculas  = await this.dataLocalService.cargarFavoritos();
        // this.generos    = await this.moviesService.cargarGeneros();

        // console.log('generos', this.generos);
        // console.log('favoritos', this.peliculas);

        // this.pelisPorGenero( this.generos, this.peliculas );

        // console.log('favoritosGeneros', this.favoritoGenero);
    }

    // esto se dispara cada vez que la pagina entra
    async ionViewWillEnter() {
        this.peliculas  = await this.dataLocalService.cargarFavoritos();
        this.generos    = await this.moviesService.cargarGeneros();
        this.pelisPorGenero( this.generos, this.peliculas );
    }

    // Mi forma
    pelisPorGenero2( generos: Genre[], peliculas: PeliculaDetalle[] ) {

        let peliculasAux: PeliculaDetalle[] = [];

        generos.map ( genero => {

            peliculas.map( pelicula => {

                pelicula.genres.map( generoPeli => {

                    if ( generoPeli.id === genero.id ) {

                        peliculasAux.push( pelicula );

                    }
                } );
            } );

            if ( peliculasAux.length > 0) {

                this.favoritoGenero.push( {
                    genero: genero.name,
                    peliculas: peliculasAux
                } );

                peliculasAux = [];
            }
        });
    }

    // optomizado 
    pelisPorGenero( generos: Genre[], peliculas: PeliculaDetalle[] ) {

        generos.forEach( genero => {

            this.favoritoGenero.push({
                genero: genero.name,
                peliculas: peliculas.filter( peli => {
                    return peli.genres.find( genre => genre.id === genero.id );
                })
            });
        } );
    }
}
