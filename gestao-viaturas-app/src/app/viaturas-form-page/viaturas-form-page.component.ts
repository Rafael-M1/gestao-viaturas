import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ViaturaService } from '../services/viaturas.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Viatura } from '../model/viatura';

@Component({
  selector: 'app-viaturas-form-page',
  templateUrl: './viaturas-form-page.component.html',
  styleUrls: ['./viaturas-form-page.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BotaoComponenteComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
  ],
})
export class ViaturasFormPageComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  viatura = {
    id: null,
    placa: '',
    ano: '',
    marca: '',
    modelo: '',
  };

  constructor(
    private router: Router,
    private viaturaService: ViaturaService,
    private _snackBar: MatSnackBar
  ) {}

  onClickSalvar() {
    const validacao: boolean = this.validarViaturaForm(this.viatura);
    if (validacao) {
      return;
    }

    this.viatura.marca = this.viatura.marca.trim();
    this.viatura.modelo = this.viatura.modelo.trim();
    this.viaturaService
      .postViaturaFetch(this.viatura)
      .then((response) => {
        this.openSnackBar(`Viatura ${response.placa} cadastrada com sucesso!`);
        this.router.navigate(['/viaturas']);
      })
      .catch((error) => {
        console.log(error);
        this.openSnackBar('Erro ao cadastrar viatura.');
      });
  }

  onClickCancelar() {
    this.router.navigate(['/viaturas']);
  }

  removerLetras(event: any) {
    //Transforma todos não numeros em ""
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
    this.viatura.ano = event.target.value;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  validarViaturaForm(viatura: Viatura): boolean {
    //Verifica se nome da pessoa tem pelo menos 3 caracteres
    if (+viatura.ano.trim() < 2000 || +viatura.ano.trim() > new Date().getFullYear()) {
      this.openSnackBar(`Ano da viatura deve ser entre 2000 e 2023.`);
      return true;
    }
    //Verifica se placa da viatura é valida
    if (!/[a-zA-Z]{3}[0-9][0-9a-zA-Z][0-9]{2}|[a-zA-Z]{3}[0-9]{4}/.test(viatura.placa)) {
      this.openSnackBar(`Formato inválido da Placa da Viatura.`);
      return true;
    }

    if (viatura.marca.trim().length < 2) {
      this.openSnackBar(`Tamanho mínimo da Marca de 2 caracteres não vazios.`);
      return true;
    }
    if (viatura.modelo.trim().length < 2) {
      this.openSnackBar(`Tamanho mínimo do Modelo de 2 caracteres não vazios.`);
      return true;
    }
    return false;
  }
}
