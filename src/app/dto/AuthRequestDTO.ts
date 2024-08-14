export class  AuthRequestDTO {
    username: string;
    password: string;

    constructor(data: any) {
        this.username = data.email;
        this.password = data.password;
        
      }
}