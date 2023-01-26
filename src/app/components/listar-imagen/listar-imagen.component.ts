import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  termino = '';
  suscripcion: Subscription;
  listImagenes: any[] = [];
  loading = false;
  imagenesPorPagina = 30;
  paginaActual = 1;
  totalPaginas = 0;

  constructor(private imagenService: ImagenService) {
    this.suscripcion = this.imagenService.getTerminoBusqueda()
    .subscribe(data => {
      this.termino = data;
      this.paginaActual = 1;
      this.loading = true;
      this.obtenerImagenes();
    });
   }

  ngOnInit(): void {
  }

  obtenerImagenes(){
    this.imagenService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual)
    .subscribe(data =>{
      this.loading = false;
      
      console.log(data);
      if(data.hits.length === 0){
        this.imagenService.setError('Opss... No encontramos ningún resultado');
        return;
      }
      this.totalPaginas = Math.ceil(data.totalHits/this.imagenesPorPagina);
      this.listImagenes = data.hits;
    }, error =>{
      this.imagenService.setError('Opss... Ocurrió un error');
      this.loading = false;
    })
  }

  paginaAnterior(){
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaSiguiente(){
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes();
  }

  paginaAnteriorClass(){
    if(this.paginaActual === 1) {
      return false;
    } else{
      return true;
    }
  }

  paginaSiguienteClass(){
    if(this.paginaActual === this.totalPaginas) {
      return false;
    } else{
      return true;
    }
  }
}
