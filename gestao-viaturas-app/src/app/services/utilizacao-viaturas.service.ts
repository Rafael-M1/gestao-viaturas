import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/utils/constants';
import { UtilizacaoViatura } from '../model/utilizacao-viatura';

@Injectable({
  providedIn: 'root'
})
export class UtilizacaoViaturasService {
  BASE_URL: string = BASE_URL;

  async getUtilizacaoViaturasFetch(): Promise<UtilizacaoViatura[]> {
    const data = await fetch(`${this.BASE_URL}/utilizacaoViaturas?_expand=pessoas&_expand=viaturas`);
    return await data.json() ?? [];
  }

  async getUtilizacaoViaturasByIdFetch(id: number): Promise<UtilizacaoViatura> {
    const data = await fetch(`${this.BASE_URL}/utilizacaoViaturas/${id}?_expand=pessoas&_expand=viaturas`);
    return await data.json() ?? [];
  }

  async postUtilizacaoViaturaFetch(utilizacaoViatura: UtilizacaoViatura): Promise<UtilizacaoViatura> {
    const response = await fetch(`${this.BASE_URL}/utilizacaoViaturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(utilizacaoViatura),
    });
    return await response.json();
  }

  async deleteUtilizacaoViaturaFetch(id: number): Promise<void> {
    await fetch(`${this.BASE_URL}/utilizacaoViaturas/${id}`, {
      method: 'DELETE',
    });
  }

  async updateUtilizacaoViaturaFetch(utilizacaoViatura: UtilizacaoViatura): Promise<UtilizacaoViatura> {
    const response = await fetch(`${this.BASE_URL}/utilizacaoViaturas/${utilizacaoViatura.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(utilizacaoViatura),
    });
    return await response.json();
  }
}
