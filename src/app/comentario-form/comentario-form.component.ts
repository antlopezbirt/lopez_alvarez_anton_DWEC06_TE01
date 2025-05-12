import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from '../models/Comentario';
import { ComentariosService } from '../services/comentarios.service';
import { ToastService } from '../services/toasts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comentario-form',
  standalone: false,
  templateUrl: './comentario-form.component.html',
  styleUrl: './comentario-form.component.css',
  providers: [ComentariosService, ToastService]
})
export class ComentarioFormComponent implements OnInit {

  @Input() seccion: any;
  @Input() comentarioEditar: any;
  @Input() siguienteRuta: string = "";
  @Input() comentarios: Array<Comentario> = [];

  public comentario: any;

  // Atributos para validación
  public nombreValido: boolean = true;
  public nombreActivo: boolean = false;
  public correoValido: boolean = true;
  public correoActivo: boolean = false;
  public comentarioValido: boolean = true;
  public comentarioActivo: boolean = false;
  public botonActivo: boolean = false;


  constructor( private _router: Router, private _comentariosService: ComentariosService, public _toastService: ToastService) {
    if(this.comentarioEditar) {
      this.comentario = this.comentarioEditar;
    } else {
      this.comentario = new Comentario('', '', '', '', new Date(), this.seccion);
    }
  }

  ngOnInit(): void {
    
  }


  // Validación formulario

  // -------------------------- VALIDACIONES ----------------------------------

  validarNombre(): void {
    this.nombreActivo = true;
    this.nombreValido = this.comentario.nombre.length != 0;

    // Chequea la validación del botón de recoger datos
    this.validarBoton();
  }

  validarCorreo(): void {
    this.correoActivo = true;
    let patron = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    this.correoValido = patron.test(this.comentario.correo);

    // Chequea la validación del botón de recoger datos
    this.validarBoton();
  }

  validarComentario(): void {
    this.comentarioActivo = true;
    this.comentarioValido = this.comentario.comentario.length != 0;

    // Chequea la validación del botón de recoger datos
    this.validarBoton();
  }

  validarBoton(): boolean {
    this.botonActivo = true;
    return (this.nombreValido && this.nombreActivo && this.correoValido && this.correoActivo && this.comentarioValido && this.comentarioActivo);
  }



  // ------------------------- PROCESADO ---------------------------------

  enviarComentario(): void {

    // PUT
    if(this.comentarioEditar) {
      this._comentariosService.update(this.comentarioEditar.id, this.comentario).subscribe({
        next: dato => {
          console.log("OK: ", dato);
        },
        error: error => {
          console.log("Error: ", error);
        }
      });

    // CREATE
    } else {
      let fecha = new Date();
      let comentarioNuevo = {
        "nombre": this.comentario.nombre,
        "correo": this.comentario.correo,
        "comentario": this.comentario.comentario,
        "fecha": fecha,
        "seccion": this.seccion
      }

      this._comentariosService.create(comentarioNuevo).subscribe({
        next: data => {
          console.log("OK: ", data);

          this.nombreValido = true;
          this.nombreActivo = false;
          this.correoValido = true;
          this.correoActivo = false;
          this.comentarioValido = true;
          this.comentarioActivo = false;
          this.botonActivo = false;

          let comentario = new Comentario(data.id, data.nombre, data.correo, data.comentario, new Date(data.fecha), data.seccion);
          this.comentarios.unshift(comentario);
          this._toastService.mostrar('Añadido nuevo comentario');
          console.log("Comentarios: ", this.comentarios);

        },
        error: error => {
          console.log("Error: ", error);
        }
      });
    }
  }

  borrarComentario(): void {

    // DELETE
    this._comentariosService.delete(this.comentarioEditar.id).subscribe({
      next: data => {
        console.log("OK: ", data);
        this.cancelar();
      },
      error: error => {
        console.log("Error: ", error);
      }
    });
  }

  cancelar(): void {
    this._router.navigate([this.siguienteRuta]);
  }
}
