import { Injectable } from '@angular/core';
import { URL_BACK_END } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  //El siguiente método nos permitirá enviar un archivo desde Angular al back-end utilizando JS puro

  subirArchivo(archivo: File, entidad: string, id: string){

    //Se retorna una promesa para que cualquier componente sea notificado cuando este proceso termine

    return new Promise((resolve, reject) =>{
      
      //El formData es lo que vamos a enviar en la petición AJAX
      let formData = new FormData();
      //El XHR es para inicializar la petición AJAX, se configuran cabeceras, respuestas, etc
      let xhr = new XMLHttpRequest();
      
      //Los parámetros son: El nombre del campo que el back-end espera, el archivo y el nombre del archivo
      formData.append('image', archivo, archivo.name);
      
      //La siguiente función sirve para notificar cualquier cambio
      xhr.onreadystatechange = function() {
        
        //Cuando el readyState es igual a 4 es porque la petición ya terminó
        if(xhr.readyState ===  4){
  
          if(xhr.status === 200){
            console.log("La imagen subió exitosamente");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("Fallo al cargar la imagen");
            reject(xhr.response);
          }
        }
      };
      
      let url = `${URL_BACK_END}/upload/${entidad}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });

  };
}
