export class Pessoa {
    id: number | null;
    nome: string;
    email: string;
    dataNascimento: Date;
  
    constructor(id:number, nome: string, email: string, dataNascimento: Date) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.dataNascimento = dataNascimento;
    }
  }
  