import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

    peliculas: PeliculaDetalle[] = [];

    constructor(private storage: Storage,
                public toastController: ToastController) { 

        this.cargarFavoritos();
    }

    async presentToast(message: string) {

        const toast = await this.toastController.create({
            message,
            duration: 1500
        });
        toast.present();
    }

    guardarPelicula( pelicula: PeliculaDetalle ) {

        let existe = false;
        let mensaje = '';

        for ( const peli of this.peliculas ) {

            if( peli.id === pelicula.id ) {
                existe = true;
                break;
            }
        }

        if ( existe ) {

            this.peliculas = this.peliculas.filter( peli => peli.id !==  pelicula.id );
            mensaje = 'Removido de favoritos';

        } else {

            this.peliculas.push( pelicula );
            mensaje = 'Agregada a favoritos';
        }

        this.presentToast( mensaje );
        this.storage.set('peliculas', this.peliculas);

        /**
         * Mando lo controrio porque si existe la estoy borrando y si no la inserto
         */
        return !existe;
    }

    /**
     * Esto retorna una promesa, lo tengo que tratar con un await sino tiene que ser con el then
     */
    async cargarFavoritos() {

        const peliculas = await this.storage.get('peliculas');

        this.peliculas = peliculas || [];

        return this.peliculas;
    }

    async existePelicula( id ) {

        await this.cargarFavoritos();

        const existe = this.peliculas.find( peli => peli.id === id );

        return (existe) ? true : false;
    }
}
