import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroCustomizado',
  standalone: true
})
export class NumeroCustomizadoPipe implements PipeTransform {

  transform(value: string): string {
    if (value == null) {
      return '';
    }
    //Transforma em float e coloca o separador de milhar com '.'
    return parseFloat(value).toLocaleString('pt-BR');
  }

}
