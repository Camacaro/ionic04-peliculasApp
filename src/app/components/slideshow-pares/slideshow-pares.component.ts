import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

    @Input() peliculas: Pelicula[] = [];

    // emitir un evento al padre, este caso tab1
    @Output() cagarMas = new EventEmitter();

    /**
     * spaceBetween, reducir el tamano de espacio entre slide
     */
    slideOpts = {
        slidesPerView: 3.3,
        freeMode: true,
        spaceBetween: -10
    };

    constructor( private modalCtrl: ModalController ) { }

    ngOnInit() {}

    onClick() {
        // console.log('cargar mas');
        this.cagarMas.emit();
    }

    async verDetalle( id: string ) {

        const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
                id
            }
        });

        modal.present();
    }

}
