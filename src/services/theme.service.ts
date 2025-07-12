import { Injectable, signal } from '@angular/core';

export type Theme = 'vibrant' | 'drowned';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme: ReturnType<typeof signal<Theme>>;

  get vibrancy() {
    return this._theme.asReadonly();
  }

  constructor() {
    const storedTheme = this.getStoredTheme();
    this._theme = signal<Theme>(storedTheme || 'drowned');
    if (!storedTheme) {
      this.setStoredTheme();
    }
  }

  toggle(): void {
    const newTheme: Theme = this._theme() === 'vibrant' ? 'drowned' : 'vibrant';
    this._theme.set(newTheme);
    this.setStoredTheme();
  }

  private getStoredTheme(): Theme | null {
    const theme = localStorage.getItem('vibrancy');
    return theme === 'vibrant' || theme === 'drowned' ? (theme as Theme) : null;
  }

  private setStoredTheme(): void {
    localStorage.setItem('vibrancy', this._theme());
  }
}
