export class UtilizacaoViatura {
    id: number | null;
    viaturasId: number;
    pessoasId: number;
    dataInicio: Date;
    dataFim: Date;
  
    constructor(id:number, viaturasId: number, pessoasId: number, dataInicio: Date, dataFim: Date) {
      this.id = id;
      this.viaturasId = viaturasId;
      this.pessoasId = pessoasId;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
    }
  }
  