import { Injectable } from "@angular/core";
import { Viatura } from "../model/viatura";
import { BASE_URL } from "src/utils/constants";

@Injectable({
  providedIn: 'root',
})
export class ViaturaService {
  BASE_URL: string = BASE_URL;

  async getViaturasFetch(): Promise<Viatura[]> {
    const data = await fetch(`${this.BASE_URL}/viaturas`);
    return await data.json() ?? [];
  }

  async getViaturaByIdFetch(id: number): Promise<Viatura> {
    const data = await fetch(`${this.BASE_URL}/viaturas/${id}`);
    return await data.json() ?? [];
  }

  async postViaturaFetch(viatura: Viatura): Promise<Viatura> {
    const response = await fetch(`${this.BASE_URL}/viaturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(viatura),
    });
    return await response.json();
  }

  async deleteViaturaFetch(id: number): Promise<void> {
    await fetch(`${this.BASE_URL}/viaturas/${id}`, {
      method: 'DELETE',
    });
  }

  async updateViaturaFetch(viatura: Viatura): Promise<Viatura> {
    const response = await fetch(`${this.BASE_URL}/viaturas/${viatura.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(viatura),
    });
    return await response.json();
  }
}
