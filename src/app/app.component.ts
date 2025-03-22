import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MissaoService } from './services/missao.service';
import { take } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-interceptors';

  protected isAuthenticated = false;
  private missaoService = inject(MissaoService);
  private authService = inject(AuthService);

  protected userName = signal<string>('');

  login() {
    this.missaoService
      .login({ heroi: this.userName() })
      .pipe(take(1))
      .subscribe((response) => {
        this.isAuthenticated = true;
        this.authService.setAuthTokens(response.token, response.refreshToken);
      });
  }

  checkHeroi() {
    this.missaoService
      .checkHeroi()
      .pipe(take(1))
      .subscribe((response) => {
        console.log({ response });
      });
  }
}
