import { Component } from '@angular/core';
import { ToastsService } from '../services/toasts.service';

@Component({
  selector: 'app-toast-contenedor',
  standalone: false,
  templateUrl: './toast-contenedor.component.html',
  styleUrl: './toast-contenedor.component.css'
})
export class ToastContenedorComponent {

  constructor( public _toastsService: ToastsService) {}
}
