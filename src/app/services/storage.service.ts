import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    setItem(key: string, value: any){
        const valueAsJson = JSON.stringify(value);
        if(!value)
            return;

        localStorage.setItem(key, valueAsJson);
    }

    getItem<T>(key: string){
        const storageItem = localStorage.getItem(key);
        if(!storageItem)
            return null;

        return JSON.parse(storageItem) as T;
    }
}