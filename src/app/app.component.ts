import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-interceptors';

  private httpClient = inject(HttpClient);
  protected isAuthenticated = false;

  private apiUrl = environment.apiUrl;

  //   login() {
  //     return this.http;
  //   }
}
