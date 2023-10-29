export class Viatura {
  id: number | null;
  placa: string;
  ano: string;
  marca: string;
  modelo: string;

  constructor(id:number, placa: string, ano: string, marca: string, modelo: string) {
    this.id = id;
    this.placa = placa;
    this.ano = ano;
    this.marca = marca;
    this.modelo = modelo;
  }
}
