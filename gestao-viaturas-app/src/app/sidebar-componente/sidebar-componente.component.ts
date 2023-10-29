import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from "../botao-componente/botao-componente.component";
import { ThemeService } from '../theme.service';

@Component({
    selector: 'app-sidebar-componente',
    templateUrl: './sidebar-componente.component.html',
    styleUrls: ['./sidebar-componente.component.css'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        NgFor,
        RouterModule,
        BotaoComponenteComponent
    ]
})
export class SidebarComponenteComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = [
    { label: 'Viaturas', path: '/viaturas' },
    { label: 'Pessoas', path: '/pessoas' },
    { label: 'Utilização das Viaturas', path: '/utilizacaoviaturas' },
  ];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private themeService: ThemeService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  onClickBotaoAlterarTema() {
    let corAtual = this.themeService.getCurrentTheme();
    if (corAtual == "") {
      this.themeService.setTheme("black");
    } else {
      this.themeService.setTheme("");
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
