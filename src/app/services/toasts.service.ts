import { Injectable } from "@angular/core";

@Injectable()
export class ToastService {
    public toasts: Array<any> = [];

    constructor() {
    }

    mostrar(mensaje: string) {
        this.toasts.push({mensaje: mensaje, class: 'toast show'});
        console.log("Toasts: ", this.toasts);
    }

    eliminar(toast: any) {
        this.toasts = this.toasts.filter(t => t !== toast);
        console.log("Toasts: ", this.toasts);
    }
}