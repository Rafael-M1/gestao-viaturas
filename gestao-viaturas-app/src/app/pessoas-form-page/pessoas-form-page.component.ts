import { Component } from '@angular/core';
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
import { Router } from '@angular/router';
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
export class PessoasFormPageComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pessoa = {
    id: null,
    nome: '',
    email: '',
    dataNascimento: new Date(),
  };
  constructor(
    private pessoaService: PessoaService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  onClickSalvar() {
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
}

// https://stackoverflow.com/questions/55752234/how-to-validate-email-address-from-a-mat-inputangular-material
