import { Component } from '@angular/core';
import { BooksNavbarComponent } from '../books-navbar/books-navbar.component';
import { BooksSidebarComponent } from '../books-sidebar/books-sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'books-container',
	standalone: true,
	imports: [BooksNavbarComponent, BooksSidebarComponent, RouterModule],
	templateUrl: './books-container.component.html',
	styleUrl: './books-container.component.css',
})
export class BooksContainerComponent {}
