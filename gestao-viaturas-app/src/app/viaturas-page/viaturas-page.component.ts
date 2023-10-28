import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { Viatura } from '../model/viatura';
import { ViaturaService } from '../viaturas-form-page/viaturas.service';
import { MatTableModule } from '@angular/material/table';

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
  ],
})
export class ViaturasPageComponent implements OnInit {
  @ViewChild('botao') botao!: BotaoComponenteComponent;
  parametro: string | null;
  viaturas?: Viatura[];
  displayedColumns: string[] = ['placa', 'ano', 'marca', 'modelo'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viaturaService: ViaturaService
  ) {
    this.parametro = this.route.snapshot.paramMap.get('parametro');
  }
  
  ngOnInit(): void {
    this.viaturas = this.viaturaService.getViaturas();
  }

  onClickAdicionar() {
    this.botao.color = 'secondary';
    this.router.navigate(['/viaturas', 'form']);
  }
}
