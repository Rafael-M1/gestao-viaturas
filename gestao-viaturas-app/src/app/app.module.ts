import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BotaoComponenteComponent,
        CardComponenteComponent,
        SidebarComponenteComponent,
        ViaturasPageComponent,
        PessoasPageComponent,
        UtilizacaoviaturasPageComponent,
    ]
})
export class AppModule { }
