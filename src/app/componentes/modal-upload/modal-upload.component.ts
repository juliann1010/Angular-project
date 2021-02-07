import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from 'src/app/services/index.services';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemporal: any; //This will storage an image in base64
  imageChangedEvent: any = '';
  @ViewChild('inputImagen', {static: false}) inputImagen: ElementRef

  constructor(
    public _modalUploadService: ModalUploadService,
    public _subirArchivoService: SubirArchivoService
  ) {
    console.log("Funciona modal!")
   }

  ngOnInit() {
  }

  //El siguiente método detecta cada vez que hay un recorte en la imagen

  imageCropped(event: ImageCroppedEvent) {
    this.imagenTemporal = event.base64;
    console.log(this.imagenTemporal)
  }

  imageLoaded() {
    console.log("imageLoaded()")
  }
  cropperReady() {
    console.log("CropperReady()")
  }
  loadImageFailed() {
    // show message
  }

  seleccionDeImagen(archivo: File){
    
    this.imageChangedEvent = event; // Crop

    if(!archivo){
      this.imagenSubir = null;
      this.imagenTemporal = null;
      return;
    }

    if(archivo.type.indexOf("image") < 0){
      Swal.fire("Sólo imagenes", "El archivo seleccionado no es una imagen", "error");
      this.imagenSubir = null;
      return;
    }


    //las siguientes líneas de código permiten mostrar una imagen temporal 
    //antes de subirla al back-end. El código es JavaScript puro

   // this.imagenSubir = this.imagenTemporal; 

    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  subirImagen(){
    this.imagenSubir = this.convertirBase64aFile(this.imagenTemporal, "imagen.png");
    console.log(this.imagenSubir);
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.entidad, this._modalUploadService.id)
    .then( resp => {

      this._modalUploadService.notificacion.emit(resp);
      this.cerrarModal();
  
    })
    .catch(err => {
      console.log("Error al cargar imagen", err);
    })
  }

  cerrarModal(){
    this.imagenTemporal = null;
    this.imagenSubir = null;
    this.imageChangedEvent = null;
    this.inputImagen.nativeElement.value = null;

    this._modalUploadService.ocultarModal();
  }

  convertirBase64aFile(data: string, nombre: string){
    var arr = data.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], nombre, {type:mime});
  }

}
