import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})

export class ConfigService {
    private _config: {};
    
    constructor(private http: HttpClient) {

        
    }
    
    loadConfig() {
        
        
        console.log("config=" + this._config);
        this.http.get<any>(`assets/env.json`).subscribe((env: {}) => {
            this._config = env;
            console.log("config=" + this._config);
        });
        
    } 

    getParam(param) {
        
        return this._config[param];
    }
};