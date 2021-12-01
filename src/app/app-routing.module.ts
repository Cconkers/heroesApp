import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { ListadoComponent } from './heroes/pages/listado/listado.component';
import { HeroesHomeComponent } from './heroes/pages/heroes-home/heroes-home.component';
import { HeroeComponent } from './heroes/pages/heroe/heroe.component';
import { BuscarComponent } from './heroes/pages/buscar/buscar.component';
import { AgregarComponent } from './heroes/pages/agregar/agregar.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'agregar',
    component: AgregarComponent,
  },

  {
    path: 'buscar',
    component: BuscarComponent,
  },

  {
    path: 'heroe',
    component: HeroeComponent,
  },

  {
    path: 'heroes-home',
    component: HeroesHomeComponent,
  },

  {
    path: 'listado',
    component: ListadoComponent,
  },
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
