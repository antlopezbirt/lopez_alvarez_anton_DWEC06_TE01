import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: false,
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {

  private destino: string | null = null;
  private comentarioId: string | null = null;

  public errorApiError: string | null = null;
  public errorApiMessage: string | null = null;

  public usuario: string = "";
  public password: string = "";
  public loginValido: boolean | null = null;
  public errorApiLoginError: string | null = null;
  public errorApiLoginMessage: string = "";

  // Atributos para validación
  public usuarioValido: boolean = true;
  public usuarioActivo: boolean = false;
  public passwordValida: boolean = true;
  public passwordActiva: boolean = false;
  public botonActivo: boolean = false;

  constructor(private _route: ActivatedRoute, private _router: Router, private _loginService: LoginService) {

    this._route.paramMap.subscribe((params: ParamMap) => {
      this.comentarioId = params.get('id');
      this.destino = params.get('destino');
      if (this.destino === null) this.destino = "";

      console.log(this.comentarioId, this.destino);
    });
  }

  ngOnInit(): void {
    
  }

  chequearLogin(): void {

    if(!this._loginService.loguearse(this.usuario, this.password)) {
      this.loginValido = false;
    } else if(this.comentarioId != null) {
        location.replace('/editar/' + this.comentarioId + '/' + this.destino);
    } else {
      location.replace('/');
    }
  }

  cancelar(): void {
    this._router.navigate(['/']);
  }

  // -------------------------- VALIDACIONES ----------------------------------

  validarUsuario(): void {
    this.usuarioActivo = true;
    this.usuarioValido = this.usuario.length != 0;

    // Chequea la validación del botón de recoger datos
    this.validarBoton();
  }

  validarPassword(): void {
    this.passwordActiva = true;
    this.passwordValida = this.password.length != 0;

    // Chequea la validación del botón de recoger datos
    this.validarBoton();
  }

  validarBoton(): boolean {
    this.botonActivo = true;
    return (this.usuarioValido && this.usuarioActivo && this.passwordValida && this.passwordActiva);
  }
}
