import { Routes } from '@angular/router';
import { LoginFromComponent } from './Components/login-from/login-from.component';
import { BooksContainerComponent } from './Components/books/books-container/books-container.component';

export const routes: Routes = [
	{ path: 'login', component: LoginFromComponent },
	{ path: 'books', component: BooksContainerComponent },
	{ path: '', redirectTo: '/books', pathMatch: 'full' },
];
