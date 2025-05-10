import { Component, OnInit, Input } from '@angular/core';
import { ComentariosService } from '../services/comentarios.service';
import { Comentario } from '../models/Comentario';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-listacomentarios',
  standalone: false,
  templateUrl: './listacomentarios.component.html',
  styleUrl: './listacomentarios.component.css',
  providers: [ComentariosService]
})
export class ListacomentariosComponent implements OnInit {
  @Input() seccion: string = "";
  public comentarios: Array<Comentario> = [];

  constructor ( private _comentariosService: ComentariosService ) {}

  ngOnInit(): void {
    this.readComentarios();
  }

  readComentarios(): void {
    this._comentariosService.getAll().subscribe({
      next: data => {
        for (let dato of data) {
          if(dato.seccion === this.seccion) {
            let comentario = new Comentario(dato.id, dato.nombre, dato.correo, dato.comentario, dato.fecha, dato.seccion);
            this.comentarios.push(comentario);
          }
        }
      },
      error: error => {
        console.log("Error al leer los comentarios: ", error);
      }
    });
  }

  hashearGravatar(correo: string): string {
    const hashedEmail = CryptoJS.SHA256(correo);
    return 'https://www.gravatar.com/avatar/' + hashedEmail + '?d=identicon&s=50';
  }
}
