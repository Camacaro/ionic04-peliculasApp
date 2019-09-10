import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    peliculasRecientes: Pelicula[] = [];

    /**
     * slidesPerView, esto es para mostrar el primer slide completo y el 30% del otro
     */
    // slideOpts = {
    //     slidesPerView: 1.3,
    //     freeMode: true,
    // };

    populares: Pelicula[] = [];

    constructor(private moviesService: MoviesService) {}

    ngOnInit() {
        this.moviesService.getFeature()
            .subscribe( (resp) => {
                // console.log('respuesta', resp);
                this.peliculasRecientes = resp.results;
            } );


        this.getPopulares();
    }

    cagarMas() {
        this.getPopulares();
    }

    getPopulares() {

        this.moviesService.getPopulares()
            .subscribe( resp => {
                // console.log('populares', resp.results);
                // agrego cada arrglo/item del arreglo resp.results

                const arrTemp = [ ...this.populares, ...resp.results  ];
                this.populares = arrTemp;
            } );
    }
}
