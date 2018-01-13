import { Role } from './role';

export class User {
    constructor(public username: string,
        public password: string,
        public fullName: string,
        public role: Role,
        public sites: string[],
        public trials: string[]) { }
}
