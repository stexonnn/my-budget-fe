export class  TransactionDTO {

    description: string;
    amount:number;
    type:string;
    account: number;
    amountInDefaultCurrrency:number;
    currency: string;
    accountName: string;

    constructor(description: string, amount: number, type: string, account: number,amountInDefaultCurrency: number,
        accountName: string,currency: string ) {
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.account = account;
        this.amountInDefaultCurrrency=amountInDefaultCurrency;
        this.currency=currency;
        this.accountName=accountName;
    }
}