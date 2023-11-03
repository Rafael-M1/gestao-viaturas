import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-utilizacaoviaturas-page',
  templateUrl: './utilizacaoviaturas-page.component.html',
  styleUrls: ['./utilizacaoviaturas-page.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
})
export class UtilizacaoviaturasPageComponent {

}
