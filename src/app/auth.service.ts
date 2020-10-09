import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from "./login/usuario"
import { environment } from './../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl + '/api/usuarios'
  token: string = environment.baseUrl + environment.obterToken
  clientID: string = environment.clientId
  clientSecret: string = environment.clientSecret
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  isAuthenticated() : boolean {
    const token = this.getToken();
    if(token) {
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false
  }

  logOut() {
    localStorage.removeItem('access_token');
  }

  getUsuarioAuthenticated() {
    const token = this.getToken();
    if(token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario
    }
    return null
  }

  getToken() {
    const tokenString = localStorage.getItem('access_token');
    if(tokenString) {
      const token = JSON.parse(tokenString).access_token
      return token
    }
    return null
  }

  salvar(usuario: Usuario): Observable<any> {
    console.log(usuario)
    return this.http.post<any>(this.baseUrl, usuario)
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
    .set("username", username)
      .set("password", password)
      .set("grant_type", "password")

      const headers = {
        "Authorization": "Basic " + btoa(`${this.clientID}:${this.clientSecret}`),
        "Content-Type": "application/x-www-form-urlencoded"
      }

    return this.http.post(this.token, params.toString(), { headers })
  }
}
