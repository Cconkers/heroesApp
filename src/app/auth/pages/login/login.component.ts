import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private AuthService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.AuthService.login().subscribe((resp) => {
      //Ir al backend y confirmar que el usuario existe
      if (resp.id) {
        this.router.navigate(['./heroes']);
      }
    });
  }
}
