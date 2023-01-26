import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  texto = '';
  mostrar = false;
  suscripcion: Subscription;

  constructor(private imagenService: ImagenService) {
    this.suscripcion = this.imagenService.getError()
    .subscribe( data => {
      this.mostrarMensaje();
      this.texto = data;
    });
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  mostrarMensaje(){
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 2000);
  }
}
