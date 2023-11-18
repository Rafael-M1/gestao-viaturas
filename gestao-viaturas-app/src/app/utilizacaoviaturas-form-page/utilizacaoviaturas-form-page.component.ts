import { Component, OnInit } from '@angular/core';
import { UtilizacaoViaturasService } from '../services/utilizacao-viaturas.service';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Pessoa } from '../model/pessoa';
import { PessoaService } from '../services/pessoas.service';
import { ViaturaService } from '../services/viaturas.service';
import { Viatura } from '../model/viatura';
import { UtilizacaoViatura } from '../model/utilizacao-viatura';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-utilizacaoviaturas-form-page',
  templateUrl: './utilizacaoviaturas-form-page.component.html',
  styleUrls: ['./utilizacaoviaturas-form-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BotaoComponenteComponent,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class UtilizacaoviaturasFormPageComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  utilizacaoViatura = {
    id: null,
    pessoasId: 0,
    viaturasId: 0,
    dataInicio: new Date(),
    dataFim: new Date(),
  };

  dataInicioSelecionada: Date | null = null;
  dataFimSelecionada: Date | null = null;
  pessoas: Pessoa[] = [];
  viaturas: Viatura[] = [];
  constructor(
    private utilizacaoViaturaService: UtilizacaoViaturasService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private pessoaService: PessoaService,
    private viaturaService: ViaturaService
  ) {}
  ngOnInit(): void {
    this.pessoaService.getPessoas().subscribe((response: Pessoa[]) => {
      this.pessoas = response;
    });
    this.viaturaService.getViaturasFetch().then((response: Viatura[]) => {
      this.viaturas = response;
    });
  }

  onClickSalvar() {
    const validacao: boolean = this.validarUtilizacaoViaturaForm(this.utilizacaoViatura);
    if (validacao) {
      return;
    }
    if (this.dataInicioSelecionada && this.dataFimSelecionada) {
      this.utilizacaoViatura.dataInicio = new Date(this.dataInicioSelecionada);
      this.utilizacaoViatura.dataFim = new Date(this.dataFimSelecionada);
      
      this.utilizacaoViaturaService
        .postUtilizacaoViaturaFetch(this.utilizacaoViatura)
        .then((response) => {
          this.openSnackBar(`Objeto cadastrado com sucesso!`);
          this.router.navigate(['/utilizacaoviaturas']);
        })
        .catch((error) => {
          console.log(error);
          this.openSnackBar('Erro ao cadastrar');
        });
    }
  }

  validarUtilizacaoViaturaForm(utilizacaoViatura: UtilizacaoViatura): boolean {
    // //Verifica se pessoa foi selecionada
    if (
      utilizacaoViatura.pessoasId == 0 ||
      utilizacaoViatura.pessoasId == null
    ) {
      this.openSnackBar(`Pessoa deve ser selecionada.`);
      return true;
    }
    // //Verifica se viatura foi selecionada
    if (
      utilizacaoViatura.viaturasId == 0 ||
      utilizacaoViatura.viaturasId == null
    ) {
      this.openSnackBar(`Viatura deve ser selecionada.`);
      return true;
    }
    //Verifica se dataInicio é menor que dataFim e se dataInicio e dataFim foram selecionadas
    if (this.dataInicioSelecionada == null) {
      this.openSnackBar(`A Data Início deve ser selecionada`);
      return true;
    }
    if (this.dataFimSelecionada == null) {
      this.openSnackBar(`A Data Fim deve ser selecionada`);
      return true;
    }
    let dataInicio = new Date(this.dataInicioSelecionada);
    let dataFim = new Date(this.dataFimSelecionada);

    if (dataInicio > dataFim) {
      this.openSnackBar(`A Data Início deve ser antes de data Fim.`);
      return true;
    }
    //Ao retornar false está válido o objeto utilizacaoViatura
    return false;
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  onClickCancelar() {
    this.router.navigate(['/utilizacaoviaturas']);
  }
}
