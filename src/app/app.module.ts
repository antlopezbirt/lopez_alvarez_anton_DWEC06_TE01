import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemandaComponent } from './demanda/demanda.component';
import { MixComponent } from './mix/mix.component';
import { OfertaComponent } from './oferta/oferta.component';
import { AboutComponent } from './about/about.component';
import { CoberturaComponent } from './cobertura/cobertura.component';

@NgModule({
  declarations: [
    AppComponent,
    DemandaComponent,
    MixComponent,
    OfertaComponent,
    AboutComponent,
    CoberturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing
  ],
  providers: [appRoutingProviders, provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
