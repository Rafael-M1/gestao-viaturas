import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../services/pessoas.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Pessoa } from '../model/pessoa';

@Component({
  selector: 'app-pessoas-form-page',
  templateUrl: './pessoas-form-page.component.html',
  styleUrls: ['./pessoas-form-page.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BotaoComponenteComponent,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class PessoasFormPageComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pessoa: Pessoa = {
    id: null,
    nome: '',
    email: '',
    dataNascimento: new Date(),
  };
  id: number | undefined;
  constructor(
    private pessoaService: PessoaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if ('id' in params) {
        this.id = +params['id']; //converte o parâmetro para número
        this.pessoaService
          .getPessoaById(this.id)
          .subscribe((response: Pessoa) => {
            this.pessoa = {
              id: this.id !== undefined ? this.id : 0,
              dataNascimento: response.dataNascimento,
              email: response.email,
              nome: response.nome,
            };
          },
          (error: any) => {
            if (error.status == 404) {
              this.openSnackBar(`Erro ao buscar Pessoa de id ${this.id}.`);
              this.router.navigate(['/pessoas']);
            }
          }
          );
      }
    });
  }

  onClickSalvar() {
    const validacao: boolean = this.validarPessoaForm(this.pessoa);
    if (validacao) {
      return;
    }
    if (this.id && this.id > 0) {
      this.pessoa = {
        id: this.pessoa.id,
        nome: this.pessoa.nome.trim(),
        email: this.pessoa.email.trim().toLowerCase(),
        dataNascimento: this.pessoa.dataNascimento,
      };
      this.pessoaService.updatePessoa(this.pessoa).subscribe({
        next: (response: Pessoa) => {
          this.openSnackBar(`Pessoa ${response.nome} alterada com sucesso!`);
          this.router.navigate(['/pessoas']);
        },
        error: (error: any) => {
          console.error(error);
          this.openSnackBar('Erro ao alterar pessoa.');
        },
      });
    } else {
      this.pessoa = {
        id: null,
        nome: this.pessoa.nome.trim(),
        email: this.pessoa.email.trim().toLowerCase(),
        dataNascimento: this.pessoa.dataNascimento,
      };
      this.pessoaService.postPessoa(this.pessoa).subscribe({
        next: (response: Pessoa) => {
          this.openSnackBar(`Pessoa ${response.nome} cadastrada com sucesso!`);
          this.router.navigate(['/pessoas']);
        },
        error: (error: any) => {
          console.error(error);
          this.openSnackBar('Erro ao cadastrar pessoa.');
        },
      });
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  onClickCancelar() {
    this.router.navigate(['/pessoas']);
  }

  validarPessoaForm(pessoa: Pessoa): boolean {
    //Verifica se nome da pessoa tem pelo menos 3 caracteres
    if (pessoa.nome.trim().length < 3) {
      this.openSnackBar(
        `Nome da Pessoa deve ter pelo menos três caracteres não vazios.`
      );
      return true;
    }
    //Verifica se email da pessoa é valido
    if (!/^[a-zA-Z0-9.-_]+@[a-zA-Z]+(\.[a-zA-Z]{2,})+$/.test(pessoa.email)) {
      this.openSnackBar(`Formato inválido do e-mail da Pessoa.`);
      return true;
    }
    //Verifica se pessoa é maior de 18 anos
    let dataAtual = new Date();
    let milissegundosEmUmAno = 1000 * 60 * 60 * 24 * 365.25;
    let idade =
      (dataAtual.getTime() - new Date(this.pessoa.dataNascimento).getTime()) /
      milissegundosEmUmAno;

    if (idade < 18) {
      this.openSnackBar(`A Pessoa deve ser maior de 18 anos.`);
      return true;
    }
    return false;
  }
}
