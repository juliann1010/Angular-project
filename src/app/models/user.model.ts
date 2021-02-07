export class Usuario{

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public status: boolean = true,
        public google?: boolean,
        public _id?: string
    ){}
}