import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-botao-componente',
  templateUrl: './botao-componente.component.html',
  styleUrls: ['./botao-componente.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule]
})
export class BotaoComponenteComponent implements OnInit, OnDestroy {
  @Input() rotulo: string = "Botão";
  @Input() color: string = "primary";
  @Input() tipo: string = 'button';
  @Input() desabilitado!: boolean;
  @Output() botaoClicado = new EventEmitter<void>();
  currentTheme!: string;
  themeSubscription!: Subscription;
  
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    const temaAtualStorage = localStorage.getItem('currentTheme');
    if (temaAtualStorage) {
      this.themeService.setTheme(temaAtualStorage);
    }
    this.themeSubscription = this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  onClickBotao() {
    this.botaoClicado.emit();
  }
}
