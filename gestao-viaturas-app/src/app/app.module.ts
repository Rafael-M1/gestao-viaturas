import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BotaoComponenteComponent } from './botao-componente/botao-componente.component';
import { CardComponenteComponent } from './card-componente/card-componente.component';
import { SidebarComponenteComponent } from './sidebar-componente/sidebar-componente.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ViaturasPageComponent } from './viaturas-page/viaturas-page.component';
import { PessoasPageComponent } from './pessoas-page/pessoas-page.component';
import { UtilizacaoviaturasPageComponent } from './utilizacaoviaturas-page/utilizacaoviaturas-page.component';
import { ViaturasFormPageComponent } from './viaturas-form-page/viaturas-form-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { PessoasFormPageComponent } from './pessoas-form-page/pessoas-form-page.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [AppComponent, HomepageComponent],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BotaoComponenteComponent,
    CardComponenteComponent,
    SidebarComponenteComponent,
    ViaturasPageComponent,
    PessoasPageComponent,
    UtilizacaoviaturasPageComponent,
    ViaturasFormPageComponent,
    MatFormFieldModule,
    HttpClientModule,
    PessoasFormPageComponent,
  ],
})
export class AppModule {}
