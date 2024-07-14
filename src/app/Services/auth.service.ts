import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	login(email: any, password: any) {
		return this.http.get<any>(`${this.apiUrl}/admins?email=${email}&password=${password}`);
	}
}
