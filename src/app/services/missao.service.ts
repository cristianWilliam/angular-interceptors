import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { MissaoHeroiLoginRequest, MissaoHeroiLoginResponse } from "./missao.service.models";

@Injectable({
    providedIn: 'root'
})
export class MissaoService {
    private controllerUrl = `${environment.apiUrl}/missao`;
    private httpClient = inject(HttpClient);

    login(heroiRequest: MissaoHeroiLoginRequest) {
        return this.httpClient.post<MissaoHeroiLoginResponse>(`${this.controllerUrl}/login`, heroiRequest);
    }
}

