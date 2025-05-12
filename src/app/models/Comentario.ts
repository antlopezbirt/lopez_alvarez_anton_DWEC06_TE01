export class Comentario {
    constructor(
        public id: string,
        public nombre: string,
        public correo: string,
        public comentario: string,
        public fecha: Date,
        public seccion: "demanda" | "mix" | "cobertura" | "about"
    ) {}
}