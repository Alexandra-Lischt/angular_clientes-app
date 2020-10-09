import { Observable } from 'rxjs';
import { Cliente } from './../cliente';
import { Component, OnInit } from '@angular/core';

import { ClientesService } from '../../clientes.service'

import { Router, ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-clientes-forms',
  templateUrl: './clientes-forms.component.html',
  styleUrls: ['./clientes-forms.component.css']
})
export class ClientesFormsComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: string[];
  id: number;
  value: string;

  constructor(private service: ClientesService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente;
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.cliente).subscribe(response => {
        this.success = true;
        this.errors = null;
      }, errorReponse => {
        this.errors = ['Erro ao atualizar o cliente.']
      })
    } else {
      this.service.salvar(this.cliente).subscribe(response => {
        this.success = true;
        this.errors = null;
        this.cliente = response;
      }, errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })
    }
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getClienteById(this.id)
          .subscribe(response => this.cliente = response,
            errorResponse => this.cliente = new Cliente())
      }
    })
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista'])
  }
}
