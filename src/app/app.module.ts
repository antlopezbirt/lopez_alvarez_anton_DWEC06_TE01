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
import { ListacomentariosComponent } from './comentarios-lista/comentarios-lista.component';
import { FormsModule } from '@angular/forms';
import { ComentarioFormComponent } from './comentario-form/comentario-form.component';

import { ComentariosService } from './services/comentarios.service';
import { ReeApiService } from './services/reeapi.service';

@NgModule({
  declarations: [
    AppComponent,
    DemandaComponent,
    MixComponent,
    AboutComponent,
    CoberturaComponent,
    LoadingComponent,
    ListacomentariosComponent,
    ComentarioFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    routing,
    FormsModule,
  ],
  providers: [appRoutingProviders, provideHttpClient(), ReeApiService, ComentariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
