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

  constructor(private router: Router, private viaturaService: ViaturaService, private _snackBar: MatSnackBar) {}

  onClickSalvar() {
    this.viaturaService
      .postViaturaFetch(this.viatura)
      .then((response) => this.openSnackBar(response));
    this.router.navigate(['/viaturas']);
    
  }

  onClickCancelar() {
    this.router.navigate(['/viaturas']);
  }

  transformarEmMaiusculo(event: any) {
    this.viatura.placa = event.target.value.toUpperCase();
  }

  removerLetras(event: any) {
    //Transforma todos não numeros em ""
    let novoValor = event.target.value.replace(/[^0-9]/g, '');
    this.viatura.ano = novoValor;
  }

  openSnackBar(viaturaResponse: Viatura) {
    this._snackBar.open(`Viatura ${viaturaResponse.placa} cadastrada com sucesso!`, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }
}
