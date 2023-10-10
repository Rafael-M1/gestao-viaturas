import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { BotaoComponenteComponent } from "../botao-componente/botao-componente.component";

@Component({
    selector: 'app-card-componente',
    templateUrl: './card-componente.component.html',
    styleUrls: ['./card-componente.component.css'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, BotaoComponenteComponent]
})
export class CardComponenteComponent {

}
