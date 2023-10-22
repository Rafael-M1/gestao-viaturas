import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponenteComponent } from './card-componente/card-componente.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViaturasPageComponent } from './viaturas-page/viaturas-page.component';
import { PessoasPageComponent } from './pessoas-page/pessoas-page.component';
import { UtilizacaoviaturasPageComponent } from './utilizacaoviaturas-page/utilizacaoviaturas-page.component';

const routes: Routes = [
  {
    path: '',
    component: CardComponenteComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'viaturas', component: ViaturasPageComponent },
      { path: 'viaturas/:parametro', component: ViaturasPageComponent },
      { path: 'pessoas', component: PessoasPageComponent },
      { path: 'utilizacaoviaturas', component: UtilizacaoviaturasPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
