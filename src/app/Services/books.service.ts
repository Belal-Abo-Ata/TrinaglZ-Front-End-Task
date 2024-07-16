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

	getBook(ISBN: number) {
		return this.http.get(`${environment.apiUrl}/books?ISBN=${ISBN}`);
	}
}
