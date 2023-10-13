import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BotaoComponenteComponent } from '../botao-componente/botao-componente.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-componente',
  templateUrl: './card-componente.component.html',
  styleUrls: ['./card-componente.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    BotaoComponenteComponent,
    RouterModule,
  ],
})
export class CardComponenteComponent {}
