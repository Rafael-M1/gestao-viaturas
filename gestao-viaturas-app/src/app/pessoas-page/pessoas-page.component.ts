import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { Pessoa } from '../model/pessoa';
import { PessoaService } from '../services/pessoas.service';

@Component({
  selector: 'app-pessoas-page',
  templateUrl: './pessoas-page.component.html',
  styleUrls: ['./pessoas-page.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    BotaoComponenteComponent,
  ],
})
export class PessoasPageComponent implements OnInit {
  pessoas?: Pessoa[];

  constructor(private router: Router, private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.pessoaService.getPessoas().subscribe((response: Pessoa[]) => {
      this.pessoas = response;
    });
  }

  onClickAdicionar() {
    this.router.navigate(['/pessoas', 'form']);
  }
}
