import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-viaturas-page',
  templateUrl: './viaturas-page.component.html',
  styleUrls: ['./viaturas-page.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
})
export class ViaturasPageComponent {}
