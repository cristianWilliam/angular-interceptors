import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-interceptors';

  private httpClient = inject(HttpClient);
  protected isAuthenticated = false;

  private apiUrl = environment.apiUrl;

  protected userName = signal<string>('');

  login() {
    console.log(this.userName());
  }
}
