import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/index.services';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  desde: number = 0;
  total: number = 0;

  constructor(
    public _hospitalService: HospitalService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  cargarHospitales(){

    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
    .subscribe((resp: any) => {

      this.total = resp.total;
      this.hospitales = resp.hospitals;
      this.cargando = false;
    })

  }

  buscarHospital(termino: string){

    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital(termino)
    .subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.cargando = false;
    })

  }

  cambiarDesde(valor: number){
    let cambioDesde = this.desde + valor;

    if(cambioDesde >= this.total){
      return;
    }

    if(cambioDesde < 0){
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

}
