export class Ingredient {
    public id: number;
    public createdBy: string;
    public creationDate: Date;
    constructor(public name: string, public amount: number) {
        this.id=0;
        this.createdBy='Test User';
        this.creationDate = new Date();
    }
}