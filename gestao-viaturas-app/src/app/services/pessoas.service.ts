import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from 'src/utils/constants';
import { Observable } from 'rxjs';
import { Pessoa } from '../model/pessoa';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  BASE_URL: string = BASE_URL;

  constructor(private http: HttpClient) {}

  getPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.BASE_URL}/pessoas`);
  }

  getPessoaById(id: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.BASE_URL}/pessoas/${id}`);
  }

  postPessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.BASE_URL}/pessoas`, pessoa, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  deletePessoa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/pessoas/${id}`);
  }

  updatePessoa(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(
      `${this.BASE_URL}/pessoas/${pessoa.id}`,
      pessoa,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
