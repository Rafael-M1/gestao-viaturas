import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import {MatNativeDateModule} from '@angular/material/core';
import { ViaturaService } from './viaturas.service';

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
    MatNativeDateModule 
  ],
})
export class ViaturasFormPageComponent {
  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;  
  viatura = {
    placa: '',
    ano: '',
    marca: '',
    modelo: '',
  };

  constructor(private router: Router, private viaturaService: ViaturaService) {}

  onClickSalvar() {
    this.viaturaService.save(this.viatura);
    this.router.navigate(['/viaturas']);
  }

  onClickCancelar() {
    this.router.navigate(['/viaturas']);
  }

  transformarEmMaiusculo(event: any) {
    this.viatura.placa = event.target.value.toUpperCase();
  }

  removerLetras(event:any) {
    //Transforma todos não numeros em ""
    let novoValor = event.target.value.replace(/[^0-9]/g, "");
    this.viatura.ano = novoValor;
  }
}
