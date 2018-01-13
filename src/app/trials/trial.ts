export class Trial {
    constructor(public id: string,
        public name: string,
        public description: string,
        public sites: string[] = [],
        public numOfVisits: number) { }
}
