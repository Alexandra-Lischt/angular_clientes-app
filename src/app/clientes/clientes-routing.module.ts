import { AuthGuard } from './../auth.guard';
import { LayoutComponent } from './../layout/layout.component';
import { ClientesFormsComponent } from './clientes-forms/clientes-forms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';

const routes: Routes = [
  {
    path: "clientes", component: LayoutComponent, canActivate: [AuthGuard],
     children: [
      {
        path: "form", component: ClientesFormsComponent
      },
      {
        path: "lista", component: ClientesListaComponent
      },
      {
        path: "form/:id", component: ClientesFormsComponent
      },
      {
        path: "", redirectTo: "/clientes/lista", pathMatch: "full"
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
