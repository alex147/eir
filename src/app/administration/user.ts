import { Role } from './role';

export class User {
    constructor(public username: string,
        public password: string,
        public fullName: string,
        public role: Role,
        public centers: string[],
        public trials: string[]) { }
}
