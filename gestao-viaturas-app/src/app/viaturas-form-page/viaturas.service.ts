import { Injectable } from "@angular/core";
import { Viatura } from "../model/viatura";

@Injectable({
  providedIn: 'root',
})
export class ViaturaService {
  viaturas!: Viatura[];
  constructor() {
    this.viaturas = this.getViaturas();
  }

  save(viatura: Viatura) {
    this.viaturas = this.getViaturas();
    this.viaturas.push(viatura);
    localStorage.setItem('viaturas', JSON.stringify(this.viaturas));
  }

  getViaturas(): Viatura[] {
    let viaturas =  JSON.parse(localStorage.getItem('viaturas')!);
    if (viaturas == null) {
        viaturas = [];
    }
    return viaturas;
  }
}
