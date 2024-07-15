import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'books-navbar',
  standalone: true,
  imports: [],
  templateUrl: './books-navbar.component.html',
  styleUrl: './books-navbar.component.css'
})
export class BooksNavbarComponent {

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('email');
    this.router.navigate(['login'])
  }

}
