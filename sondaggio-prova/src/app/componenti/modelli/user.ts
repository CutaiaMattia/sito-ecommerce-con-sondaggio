export class User {
  id: number;
  nome: string;
  cognome:string;
  email: {
    mail: string;
    confirmMail : string;
  };
  password: {
    pwd: string;
    confirmPwd: string;
  };
  citta:string;
  indirizzo:string;
  dataNascita: Date;
  terms: boolean;


constructor(values: Object = {}) {
  //Constructor initialization
    Object.assign(this, values);
}
}
