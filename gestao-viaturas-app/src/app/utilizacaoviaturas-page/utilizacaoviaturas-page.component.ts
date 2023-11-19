import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { UtilizacaoViatura } from '../model/utilizacao-viatura';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { NumeroCustomizadoPipe } from '../pipes/numero-customizado.pipe';
import { UtilizacaoViaturasService } from '../services/utilizacao-viaturas.service';
import { Viatura } from '../model/viatura';

@Component({
  selector: 'app-utilizacaoviaturas-page',
  templateUrl: './utilizacaoviaturas-page.component.html',
  styleUrls: ['./utilizacaoviaturas-page.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    BotaoComponenteComponent,
    MatTableModule,
    NumeroCustomizadoPipe,
  ],
})
export class UtilizacaoviaturasPageComponent implements OnInit {
  utilizacaoViaturas?: UtilizacaoViatura[];
  displayedColumns: string[] = ['placa', 'pessoa', 'datainicio', 'datafim'];

  constructor(
    private router: Router,
    private utilizacaoViaturasService: UtilizacaoViaturasService
  ) {}

  ngOnInit(): void {
    this.utilizacaoViaturasService
      .getUtilizacaoViaturasFetch()
      .then(
        (response: UtilizacaoViatura[]) => {
          this.utilizacaoViaturas = response;
        }
      );
  }

  onClickAdicionar() {
    this.router.navigate(['/utilizacaoviaturas', 'form']);
  }
}
