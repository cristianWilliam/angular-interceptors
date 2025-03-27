import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import {
  MissaoHeroiLoginRequest,
  MissaoHeroiLoginResponse,
  MissaoHeroiRefreshTokenRequest,
} from './missao.service.models';
import { STORAGE_REFRESH_TOKEN } from './storage.service.constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class MissaoService {
  private controllerUrl = `${environment.apiUrl}/missao`;
  private httpClient = inject(HttpClient);
  private storageService = inject(StorageService);

  login(heroiRequest: MissaoHeroiLoginRequest) {
    return this.httpClient.post<MissaoHeroiLoginResponse>(
      `${this.controllerUrl}/login`,
      heroiRequest
    );
  }

  checkHeroi() {
    return this.httpClient.get<string>(`${this.controllerUrl}/somente-heroi`);
  }

  refreshToken() {
    const tokenValidation = this.storageService.getItem<string>(
      STORAGE_REFRESH_TOKEN
    );
    if (!tokenValidation) throw new Error('User não autenticado');

    const refreshTokenRequest: MissaoHeroiRefreshTokenRequest = {
      refreshToken: tokenValidation,
    };

    return this.httpClient.post<MissaoHeroiLoginResponse>(
      `${this.controllerUrl}/refresh-token`,
      refreshTokenRequest
    );
  }
}

