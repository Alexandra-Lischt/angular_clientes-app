import { ServicoPrestadoBusca } from './servico-prestado/servico-prestado-lista/servicoPrestadoBusca';
import { Observable } from 'rxjs';
import { ServicoPrestado } from './servico-prestado/servicoPrestado';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  salvar(servicoPrestado: ServicoPrestado): Observable<ServicoPrestado> {
    console.log(servicoPrestado)
    return this.http.post<ServicoPrestado>(`${this.baseUrl}/api/servicos-prestados`, servicoPrestado)
  }

  buscar(nome: string, mes: number): Observable<ServicoPrestadoBusca[]> {

    const httpParams = new HttpParams().set("nome", nome).set("mes", mes.toString());

    const url = this.baseUrl + "/api/servicos-prestados?" + httpParams.toString();
    console.log(url)
    return this.http.get<any>(url);
  }
}