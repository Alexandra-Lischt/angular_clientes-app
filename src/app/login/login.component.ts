import { AuthService } from './../auth.service';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;
  loginError: boolean;
  mensagemSuccess: string;
  cadastrando: boolean;
  errors: string[];

  constructor(private router: Router,
    private authService: AuthService) { }

  onSubmit() {
    this.authService
    .tentarLogar(this.username, this.password)
    .subscribe(response => {
      const access_token = JSON.stringify(response);
      localStorage.setItem('access_token',  access_token)
      this.router.navigate(['/home'])

    }, errorResponse => {
      this.errors = ["Usuário e/ou senha incorreto(a)."]
    })
  }
preparaCadastrar(event) {
  event.preventDefault()
  this.cadastrando = true;
}

cancelaCadastro() {
  this.cadastrando = false
}

cadastrar() {
  const usuario : Usuario = new Usuario();
  usuario.username = this.username;
  usuario.password = this.password;

  this.authService.salvar(usuario).subscribe(response => {
    this.mensagemSuccess = "Cadastro realizado com sucesso!"
    this.loginError = false
    this.cadastrando = false;
    this.username = "";
    this.password = "";
    this.errors = [];
  }, errorResponse => {
    this.mensagemSuccess = null;
    this.errors = errorResponse.error.errors;
  })
}
}
