import { Router } from '@angular/router';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado: string

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioLogado = this.authService.getUsuarioAuthenticated();
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login'])
  }
}
