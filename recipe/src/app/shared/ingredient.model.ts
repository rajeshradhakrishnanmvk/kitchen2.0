export class Ingredient {
    public createdBy: string;
    public creationDate: Date;
    constructor(public name: string, public amount: number) {
        this.creationDate = new Date();
    }
}