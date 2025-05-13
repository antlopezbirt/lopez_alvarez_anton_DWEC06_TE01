import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Route } from "@angular/router";

// Imports de components
import { DemandaComponent } from "./demanda/demanda.component";
import { MixComponent } from "./mix/mix.component";
import { AboutComponent } from "./about/about.component";
import { CoberturaComponent } from "./cobertura/cobertura.component";
import { ComentarioFormEditarComponent } from "./comentario-form-editar/comentario-form-editar.component";
import { LoginFormComponent } from "./login-form/login-form.component";

// Declaración de rutas
const appRoutes: Routes = [
    {path: '', component: DemandaComponent},
    {path: 'demanda', component: DemandaComponent},
    {path: 'mix', component: MixComponent},
    {path: 'cobertura', component: CoberturaComponent},
    {path: 'about', component: AboutComponent},
    {path: 'editar/:id/:destino', component: ComentarioFormEditarComponent},
    {path: 'login', component: LoginFormComponent},
    {path: 'login/:destino', component: LoginFormComponent},
    {path: 'login/:destino/:id', component: LoginFormComponent},
    {path: '**', component: DemandaComponent} // Para cuando haya un 404
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);