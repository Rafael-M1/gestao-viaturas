import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from "../botao-componente/botao-componente.component";

@Component({
    selector: 'app-viaturas-page',
    templateUrl: './viaturas-page.component.html',
    styleUrls: ['./viaturas-page.component.css'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule, BotaoComponenteComponent]
})
export class ViaturasPageComponent {
  @ViewChild("botao") botao!: BotaoComponenteComponent;
  parametro: string | null;

  constructor(private route: ActivatedRoute) {
    this.parametro =  this.route.snapshot.paramMap.get('parametro');
  }

  mudarCorDeFundo() {
    this.botao.rotulo = "Rótulo Alterado";
    this.botao.color = "secondary";
  }
}
