import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares'
})
export class ParesPipe implements PipeTransform {

    /**
     * funcion para transformar un arreglo a un arreglo de pares
     */

    // 0: Array(2)
    //     0: {popularity: 568.124, vote_count: 165, video: false, poster_path: "/pxw6j2AwlUsw5iS4fCxPoCP0jPh.jpg", id: 474350, …}
    //     1: {popularity: 326.549, vote_count: 1603, video: false, poster_path: "/rdByKDkfyVuVSrkllzxKYXiZmTd.jpg", id: 320288, …}
    // 1: (2) [{…}, {…}]

    transform( arr: any[] ): any[] {

        const pares = arr.reduce( (result, value, index, array) => {

            if ( index % 2 === 0) {
                result.push(array.slice(index, index + 2));
            }

            return result;
        }, []);

        // console.log(pares);
        return pares;
    }

}


