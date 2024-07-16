import { Routes } from '@angular/router';
import { LoginFromComponent } from './Components/login-from/login-from.component';
import { BooksContainerComponent } from './Components/books/books-container/books-container.component';
import { authGuard } from './Guards/auth.guard';
import { ListBooksComponent } from './Components/books/list-books/list-books.component';
import { ViewBookComponent } from './Components/books/view-book/view-book.component';
import { EditBookComponent } from './Components/books/edit-book/edit-book.component';
import { AddBookComponent } from './Components/books/add-book/add-book.component';

export const routes: Routes = [
	{ path: 'login', component: LoginFromComponent },
	{
		path: 'books',
		component: BooksContainerComponent,
		children: [
			{
				path: '',
				component: ListBooksComponent,
			},
			{
				path: 'add',
				component: AddBookComponent,
			},
			{
				path: ':isbn',
				component: ViewBookComponent,
			},

			{
				path: ':isbn/edit',
				component: EditBookComponent,
			},
		],
		canActivate: [authGuard],
	},
	{ path: '', redirectTo: '/books', pathMatch: 'full' },
  // TODO: add the not found page
	// { path: '*', component: },
];
