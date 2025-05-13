import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [LoginService]
})
export class AppComponent {
  title = 'infoElectrica';

  public logueado: boolean | null = null;

  constructor(public _loginService: LoginService, private _route: ActivatedRoute, private _router: Router) {
    this.logueado = this._loginService.comprobarLogin();
  }

  deslogueo(): void {
    this._loginService.desloguearse();
    // Para el logueo y el deslogueo necesitamos recargar la página index para actualizar los iconos
    location.replace('/');
  }
}
