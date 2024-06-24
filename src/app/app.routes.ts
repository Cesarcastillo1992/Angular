import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ResumenComponent } from './resumen/resumen.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'resumen', component: ResumenComponent },
  { path: '**', redirectTo: '' },
];
