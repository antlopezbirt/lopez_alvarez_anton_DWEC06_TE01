import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemandaComponent } from './demanda/demanda.component';
import { MixComponent } from './mix/mix.component';
import { AboutComponent } from './about/about.component';
import { CoberturaComponent } from './cobertura/cobertura.component';
import { LoadingComponent } from './loading/loading.component';
import { ComentariosListaComponent } from './comentarios-lista/comentarios-lista.component';
import { FormsModule } from '@angular/forms';
import { ComentarioFormNuevoComponent } from './comentario-form-nuevo/comentario-form-nuevo.component';
import { ToastContenedorComponent } from './toast-contenedor/toast-contenedor.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComentarioFormEditarComponent } from './comentario-form-editar/comentario-form-editar.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DemandaComponent,
    MixComponent,
    AboutComponent,
    CoberturaComponent,
    LoadingComponent,
    ComentariosListaComponent,
    ComentarioFormNuevoComponent,
    ToastContenedorComponent,
    ComentarioFormEditarComponent,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    routing,
    FormsModule,
    NgbModule,
  ],
  providers: [appRoutingProviders, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
