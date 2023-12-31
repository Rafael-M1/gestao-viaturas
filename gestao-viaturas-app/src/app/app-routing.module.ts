import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponenteComponent } from './card-componente/card-componente.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViaturasPageComponent } from './viaturas-page/viaturas-page.component';
import { PessoasPageComponent } from './pessoas-page/pessoas-page.component';
import { UtilizacaoviaturasPageComponent } from './utilizacaoviaturas-page/utilizacaoviaturas-page.component';
import { ViaturasFormPageComponent } from './viaturas-form-page/viaturas-form-page.component';
import { PessoasFormPageComponent } from './pessoas-form-page/pessoas-form-page.component';
import { UtilizacaoviaturasFormPageComponent } from './utilizacaoviaturas-form-page/utilizacaoviaturas-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: CardComponenteComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'viaturas', component: ViaturasPageComponent },
      { path: 'viaturas/form', component: ViaturasFormPageComponent },
      { path: 'viaturas/form/:id', component: ViaturasFormPageComponent },
      { path: 'pessoas', component: PessoasPageComponent },
      { path: 'pessoas/form', component: PessoasFormPageComponent },
      { path: 'pessoas/form/:id', component: PessoasFormPageComponent },
      { path: 'utilizacaoviaturas', component: UtilizacaoviaturasPageComponent },
      { path: 'utilizacaoviaturas/form', component: UtilizacaoviaturasFormPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
