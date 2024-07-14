import { Component, ElementRef, ViewChild } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-from',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule],
	providers: [AuthService],
	templateUrl: './login-from.component.html',
	styleUrl: './login-from.component.css',
})
export class LoginFromComponent {
	constructor(
		private router: Router,
		private authService: AuthService,
	) {}
	// password input element reference
	// used to handle the show and the hide of password
	@ViewChild('passwordInput') passwordInput!: ElementRef;

	emailErrorMsg!: string;
	passErrorMsg!: string;
	credintialsErrMsg!: string;

	loginForm: FormGroup = new FormGroup(
		{
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(8)]),
		},
		{ updateOn: 'change' },
	);

	changePasswordType(e: Event) {
		// toggle the visibility of the password
		this.passwordInput.nativeElement.type =
			this.passwordInput.nativeElement.type === 'text' ? 'password' : 'text';
		// toggle the show and hide in password input element button
		const btn = e.target as HTMLElement;
		btn.textContent = btn.textContent?.trim() === 'show' ? 'hide' : 'show';
	}

	login(e: Event): void {
		e.preventDefault();
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;
			console.log('Email:', email, 'Password:', password);
			this.authService.login(email, password).subscribe({
				next: (res) => {
					this.loginHandle(res);
				},
				error: (error) => {
					console.error('Login Request has failed', error);
				},
			});
		} else {
			console.log('Form is invalid');
			this.validationHandle(this.loginForm.controls['email'], 'email');
			// console.log(this.loginForm.controls['email']);
			// console.log(this.loginForm.controls['email'].errors);
		}
	}

	loginHandle(res: []): void {
		if (res.length) {
			console.log('Login successed');
			this.router.navigate(['']);
		} else {
			console.log('Wrong user credentials');
		}
	}

	validationHandle(controler: AbstractControl, ctrlName: string): void {
		for (const err in controler.errors) {
			switch (err) {
				case 'required':
					console.log(`the ${ctrlName} is required`);
					break;
				case 'email':
					console.log(`the ${ctrlName} must be a valid email `);
					break;
				case 'minLength':
					console.log(`the ${ctrlName} is required`);
					break;
			}
		}
	}

	// get emailValid(): boolean {
	// 	return this.loginForm.controls['email'].valid;
	// }
	// get passwordValid(): boolean {
	// 	return this.loginForm.controls['password'].valid;
	// }
}
