import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from '../models/Comentario';
import { ComentariosService } from '../services/comentarios.service';
import { ToastService } from '../services/toasts.service';


@Component({
  selector: 'app-comentario-form-nuevo',
  standalone: false,
  templateUrl: './comentario-form-nuevo.component.html',
  styleUrl: './comentario-form-nuevo.component.css',
  providers: [ComentariosService, ToastService]
})
export class ComentarioFormNuevoComponent implements OnInit {

  // Inputs con la sección a aplicar al comentario y el array de comentarios
  @Input() seccion: any;
  @Input() comentarios: Array<Comentario> = [];

  // Valor inicial del comentario
  public comentario: Comentario = new Comentario('0','','','', new Date(),'demanda');

  // Atributos para validación
  public nombreValido: boolean = true;
  public nombreActivo: boolean = false;
  public correoValido: boolean = true;
  public correoActivo: boolean = false;
  public comentarioValido: boolean = true;
  public comentarioActivo: boolean = false;
  public botonActivo: boolean = false;


  constructor(public _comentariosService: ComentariosService, public _toastsService: ToastService) {}

  ngOnInit(): void {}


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

    // CREATE
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

        // Añade el comentario

        let comentario = new Comentario(data.id, data.nombre, data.correo, data.comentario, new Date(data.fecha), data.seccion);
        this.comentarios.unshift(comentario);
        this._toastsService.mostrar('Añadido nuevo comentario');
        console.log("Comentarios: ", this.comentarios);

        // Reinicia la validación del formulario

        this.nombreValido = true;
        this.nombreActivo = false;
        this.correoValido = true;
        this.correoActivo = false;
        this.comentarioValido = true;
        this.comentarioActivo = false;
        this.botonActivo = false;
      },
      error: error => {
        console.log("Error: ", error);
      }
    });
  }
}
