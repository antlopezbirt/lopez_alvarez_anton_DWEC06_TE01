import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ComentariosService } from '../services/comentarios.service';
import { Comentario } from '../models/Comentario';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-comentarios-lista',
  standalone: false,
  templateUrl: './comentarios-lista.component.html',
  styleUrl: './comentarios-lista.component.css',
  providers: [ComentariosService]
})
export class ListacomentariosComponent implements OnInit {
  @Input() seccion: string = "";
  public comentarios: Array<Comentario> = [];
  public errorApiError: unknown = null;
  public errorApiMessage: unknown = null;

  public comentarioNuevo: Comentario;

  constructor ( private _http: HttpClient, private _comentariosService: ComentariosService ) {
    this.readComentarios();
    this.comentarioNuevo = new Comentario('','','','','',"demanda")
  }

  ngOnInit(): void {
    
  }

  readComentarios(): void {
    this._http.get<Comentario[]>('https://68209462259dad2655acf7e3.mockapi.io/api/comments').subscribe({
      next: data => {
        for (let dato of data) {
          if(dato.seccion === this.seccion) {
            let comentario = new Comentario(dato.id, dato.nombre, dato.correo, dato.comentario, dato.fecha, dato.seccion);
            this.comentarios.unshift(comentario);
          }
        }
      },
      error: error => {
        console.log("Error al leer los comentarios: ", error);
        this.errorApiError = error.error;
        this.errorApiMessage = error.message;
      }
    });
  }

  hashearGravatar(correo: string): string {
    const hashedEmail = CryptoJS.SHA256(correo);
    return 'https://www.gravatar.com/avatar/' + hashedEmail + '?d=identicon&s=50';
  }

  enviarComentario(): void {
    let fecha = new Date().toISOString();
    let comentarioNuevo = {
      "nombre": this.comentarioNuevo.nombre,
      "correo": this.comentarioNuevo.correo,
      "comentario": this.comentarioNuevo.comentario,
      "fecha": fecha,
      "seccion": this.comentarioNuevo.seccion
    }

    this._comentariosService.create(comentarioNuevo).subscribe({
      next: dato => {
        console.log("OK: ", dato);
        let comentario = new Comentario(dato.id, dato.nombre, dato.correo, dato.comentario, dato.fecha, dato.seccion);
        this.comentarios.unshift(dato);

      },
      error: error => {
        console.log("Error: ", error);
      }
    });
  }
}
