import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<string>("");
  currentTheme$: Observable<string> = this.currentTheme.asObservable();

  setTheme(theme: string): void {
    this.currentTheme.next(theme);
  }

  getCurrentTheme(): string {
    return this.currentTheme.value;
  }
}
