export class User {
    constructor(public username: string,
        public fullName: string,
        public role: string,
        public centers: string[],
        public trials: string[]) { }
}
