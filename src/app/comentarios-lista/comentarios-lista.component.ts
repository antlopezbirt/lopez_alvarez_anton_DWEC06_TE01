import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ComentariosService } from '../services/comentarios.service';
import { Comentario } from '../models/Comentario';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-comentarios-lista',
  standalone: false,
  templateUrl: './comentarios-lista.component.html',
  styleUrl: './comentarios-lista.component.css',
  providers: [LoginService, ComentariosService]
})
export class ComentariosListaComponent implements OnInit {

  @Input() seccion: any;

  public comentarios: Array<Comentario> = [];
  public errorApiError: string | null = null;
  public errorApiMessage: string | null = null;

  constructor ( private _router: Router, public _loginService: LoginService, private _comentariosService: ComentariosService ) {
    this.readComentarios();
  }

  ngOnInit(): void {
    
  }

  readComentarios(): void {
    this._comentariosService.getAll().subscribe({
      next: data => {
        for (let dato of data) {
          this.errorApiError = null;
          if(dato.seccion === this.seccion) {
            let comentario = new Comentario(dato.id, dato.nombre, dato.correo, dato.comentario, new Date(dato.fecha), dato.seccion);
            this.comentarios.push(comentario);
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

  editarComentario(id: any): void {
    this._router.navigate(['editar', id, this.seccion],);
  }

  // Devuelve la ruta de iconos generados por Gravatar
  hashearGravatar(correo: string): string {
    const hashedEmail = CryptoJS.SHA256(correo);
    return 'https://www.gravatar.com/avatar/' + hashedEmail + '?d=identicon&s=50';
  }
}
