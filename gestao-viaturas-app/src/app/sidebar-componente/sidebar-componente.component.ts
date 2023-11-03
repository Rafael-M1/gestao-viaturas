import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BotaoComponenteComponent } from "../botao-componente/botao-componente.component";
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs/internal/Subscription';

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
export class SidebarComponenteComponent implements OnInit, OnDestroy {
  currentTheme!: string;
  mobileQuery: MediaQueryList;
  themeSubscription!: Subscription;
  
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
  ngOnInit(): void {
    const temaAtualStorage = localStorage.getItem('currentTheme');
    if (temaAtualStorage) {
      this.themeService.setTheme(temaAtualStorage);
    }
    this.themeSubscription = this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }
  onClickBotaoAlterarTema() {
    let corAtual = this.themeService.getCurrentTheme();
    if (corAtual == "") {
      this.themeService.setTheme("black");
      localStorage.setItem("currentTheme", "black");
    } else {
      this.themeService.setTheme("");
      localStorage.setItem("currentTheme", "");
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
