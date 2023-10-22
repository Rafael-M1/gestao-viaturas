import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from "../botao-componente/botao-componente.component";

@Component({
    selector: 'app-pessoas-page',
    templateUrl: './pessoas-page.component.html',
    styleUrls: ['./pessoas-page.component.css'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterModule, BotaoComponenteComponent]
})
export class PessoasPageComponent {
    constructor(private router: Router) {}

    navegarParaViaturasPage(parametro: string) {
        this.router.navigate(['/viaturas', parametro]);
    }

    onClickBotaoTeste() {
        this.navegarParaViaturasPage("teste");
    }

    onClickBotaoSalvar() {
        this.navegarParaViaturasPage("salvar");
    }
}
