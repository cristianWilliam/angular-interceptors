import { inject, Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { STORAGE_REFRESH_TOKEN, STORAGE_TOKEN } from "./storage.service.constants";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private storageService = inject(StorageService);
    
    setAuthTokens(token: string, refreshToken: string){
        this.storageService.setItem(STORAGE_TOKEN, token);
        this.storageService.setItem(STORAGE_REFRESH_TOKEN, refreshToken);
    }

    getToken(){
        return this.storageService.getItem<string>(STORAGE_TOKEN);
    }

    getRefreshToken(){
        return this.storageService.getItem<string>(STORAGE_REFRESH_TOKEN);
    }
}