import { Component, OnInit } from '@angular/core';
import { Comentario } from '../models/Comentario';
import { ComentarioFormNuevoComponent } from '../comentario-form-nuevo/comentario-form-nuevo.component';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ComentariosService } from '../services/comentarios.service';
import { ToastsService } from '../services/toasts.service';

@Component({
  selector: 'app-comentario-form-editar',
  standalone: false,
  templateUrl: './comentario-form-editar.component.html',
  styleUrl: './comentario-form-editar.component.css',
})
export class ComentarioFormEditarComponent extends ComentarioFormNuevoComponent implements OnInit {

  private destino: any;
  
  public comentarioId: any;
  public comentarioEditar: boolean = false;
  public fechaEditar: string = "";

  public errorApiComentariosError: string | null = null;
  public errorApiComentariosMessage: string | null = null;
  public errorApiLoginError: string | null = null;
  public errorApiLoginMessage: string | null = null;

  constructor(
    private _route: ActivatedRoute, private _router: Router, 
    private _loginService: LoginService, _comentariosService: ComentariosService, 
    _toastsService: ToastsService
  ) {
    super(_comentariosService, _toastsService);

    this._route.paramMap.subscribe((params: ParamMap) => {

      this.comentarioId = params.get('id');
      this.destino = params.get('destino');

      // Requiere estar logueado
      if(!this._loginService.comprobarLogin()) {
        this.redirigirLogin(this.comentarioId, this.destino);
      } else if(this.comentarioId != 0 && this.comentarioId != "" && this.comentarioId != null) {
        this.getComentarioById(this.comentarioId);
      } else {
        this.cancelar();
      }

    });
  }

  override ngOnInit(): void {
    
  }

  // ------------------------------ LOGIN --------------------------------------


  redirigirLogin(comentarioId: string, destino: string) {
    this._router.navigate(['login', destino, comentarioId])
  }

  // --------------------------- RECUPERACION ----------------------------------
  
  getComentarioById(id: string): void {
    this._comentariosService.getById(id).subscribe({
      next: data => {
        this.errorApiComentariosError = null;
        this.comentario = new Comentario(data.id, data.nombre, data.correo, data.comentario, new Date(data.fecha), data.seccion);
        // console.log(this.comentario);
        this.comentarioEditar = true;
        this.fechaEditar = this.comentario.fecha.toISOString();
        this.fechaEditar = this.fechaEditar.substring(0, (this.fechaEditar.length - 5));
        // console.log("Fecha formulario: ", this.fechaEditar);

        this.validarNombre();
        this.validarCorreo();
        this.validarComentario();
      },
      error: error => {
        console.log("Error al recuperar el comentario: ", error);
        this.errorApiComentariosError = "Se ha producido un error en la solicitud. Es posible que la fuente esté fuera de servicio.";
        this.errorApiComentariosMessage = error.message;
      }
    })
  }

  // ------------------------------ PROCESADO ----------------------------------

  override enviarComentario(): void {

    // PUT

    /*
      Para que la hora sea reconocida por el date picker del formulario, nos
      sobra la Z (ver substring en getComentarioById), pero al enviársela de
      nuevo a la API necesitamos añadir de nuevo la Z, de lo contrario JS lo
      parsea como horario local y la hora va acumulando desajustes con cada edición.
    */
    this.comentario.fecha = new Date(this.fechaEditar+'Z'); 
    this._comentariosService.update(this.comentario.id, this.comentario).subscribe({
      next: dato => {
        console.log("OK: ", dato);
        this._toastsService.mostrar('El comentario se ha modificado correctamente.');
        this.cancelar();
      },
      error: error => {
        console.log("Error: ", error);
      }
    });
  }

  borrarComentario(): void {
    // DELETE
    this._comentariosService.delete(this.comentario.id).subscribe({
      next: data => {
        console.log("OK: ", data);
        this._toastsService.mostrar('El comentario se ha eliminado correctamente.');
        this.cancelar();
      },
      error: error => {
        console.log("Error: ", error);
        this._toastsService.mostrar('Ha habido un error al eliminar el comentario.');
      }
    });
  }

  cancelar(): void {
    console.log(this.seccion);
    this._router.navigate([this.destino]);
  }

}
