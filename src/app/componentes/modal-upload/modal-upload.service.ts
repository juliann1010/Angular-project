import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public entidad: string;
  public id: string;

  public oculto: string = 'oculto';

  //El siguiente atributo nos permitirá devolver el objeto JSON de respuesta
  //a un componente que esté utilizando el modal, cada vez que se ejecute una actualizacón

  public notificacion = new EventEmitter<any>();

  constructor() { 
    console.log("Servicio del modal está funcionando melo")
  }

  ocultarModal(){
    this.oculto = 'oculto';
    this.entidad = null;
    this.id = null;
  }

  mostrarModal(entidad: string, id: string){
    this.oculto = '';
    this.entidad = entidad;
    this.id = id;
  }

  
}
