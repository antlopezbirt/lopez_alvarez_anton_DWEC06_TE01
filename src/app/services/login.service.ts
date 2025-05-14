import { Injectable } from "@angular/core";
import * as loginData from "../data/login.json";
import CryptoJS from 'crypto-js';

@Injectable()
export class LoginService {
    private loginData: any = (loginData as any).default;

    constructor() {}

    loguearse(usuario: string, password: String): boolean {
        if (usuario === this.loginData.user && password === this.loginData.pass) {
            const session = CryptoJS.SHA256(new Date().toISOString()).toString();
            sessionStorage.setItem('session', session);
            return true;
        }
        return false;
    }

    comprobarLogin(): boolean {
        return (sessionStorage.getItem('session') != null && sessionStorage.getItem('session') != "");
    }

    desloguearse() {
        sessionStorage.clear();
    }
}