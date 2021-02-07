import { Pipe, PipeTransform } from '@angular/core';
import { URL_BACK_END } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, entidad: string = 'user'): any {

    if(img.indexOf('https') >= 0){
      return img;
    }
    
    let url = `${URL_BACK_END}/images`;

    if (!img){
      return `${url}/notfound/notfound`;
    }

    switch(entidad){
      case 'user':
        url += `/user/${img}`;
        break;

      case 'hospital':
        url += `/hospital/${img}`;
        break;

      case 'doctor':
        url += `/doctor/${img}`;
        break;

      default:
        console.log("Tipo de usuario no existe, usuario, hospitales, medicos");
        url += `/notfound/notfound`;
    }

    return url;
  }

}
