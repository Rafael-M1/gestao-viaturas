import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { Viatura } from '../model/viatura';
import { ViaturaService } from '../services/viaturas.service';
import { MatTableModule } from '@angular/material/table';
import { NumeroCustomizadoPipe } from '../pipes/numero-customizado.pipe';

@Component({
    selector: 'app-viaturas-page',
    templateUrl: './viaturas-page.component.html',
    styleUrls: ['./viaturas-page.component.css'],
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        RouterModule,
        CommonModule,
        BotaoComponenteComponent,
        MatTableModule,
        NumeroCustomizadoPipe
    ]
})
export class ViaturasPageComponent implements OnInit {
  viaturas?: Viatura[];
  displayedColumns: string[] = ['placa', 'ano', 'marca', 'modelo'];

  constructor(private router: Router, private viaturaService: ViaturaService) {}

  ngOnInit(): void {
    this.viaturaService
      .getViaturasFetch()
      .then((response: Viatura[]) => (this.viaturas = response));
  }

  onClickAdicionar() {
    this.router.navigate(['/viaturas', 'form']);
  }
}
