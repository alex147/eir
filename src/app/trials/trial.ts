export class Trial {
    constructor(public id: string,
        public name: string,
        public description: string,
        public centers: string[] = []) { }
}
