export class  TransactionDTO {

    description: string;
    amount:number;
    type:string;
    account: number;

    constructor(description: string, amount: number, type: string, account: number) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.account = account;
    }
}