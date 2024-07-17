import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import BookInterface from '../Interfaces/books.interface';

@Injectable({
	providedIn: 'root',
})
export class BooksService {
	constructor(private http: HttpClient) {}
	getAllBokks() {
		return this.http.get(`${environment.apiUrl}/books`);
	}

	getBook(ISBN: string) {
		return this.http.get(`${environment.apiUrl}/books?ISBN=${ISBN}`);
	}

  deleteBook(ISBN: string) {
    return this.http.delete(`${environment.apiUrl}/books/${ISBN}`);
  }

  addBook(book: any) {
    return this.http.post(`${environment.apiUrl}/books`, book)
  }

  editBook(ISBN: string, book: any) {
    return this.http.put(`${environment.apiUrl}/books/${ISBN}`, book)
  }
}
