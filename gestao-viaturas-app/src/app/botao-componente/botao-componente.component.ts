import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-botao-componente',
  templateUrl: './botao-componente.component.html',
  styleUrls: ['./botao-componente.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule]
})
export class BotaoComponenteComponent {
  @Input() rotulo: string = "Botão";
  @Input() color: string = "primary";
  @Input() tipo: string = 'button';
  @Input() desabilitado!: boolean;
  @Output() botaoClicado = new EventEmitter<void>();

  onClickBotao() {
    this.botaoClicado.emit();
  }
}
