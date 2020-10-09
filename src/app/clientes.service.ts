import { Cliente } from './clientes/cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  salvar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.baseUrl}/api/clientes`, cliente );
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.baseUrl}/api/clientes/${cliente.id}`, cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/api/clientes`)
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.baseUrl}/api/clientes/${id}`)
  }

  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/clientes/${cliente.id}`)
  }
}
