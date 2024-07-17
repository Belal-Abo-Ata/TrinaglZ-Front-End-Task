import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { LogoComponent } from '../logo/logo.component';

@Component({
	selector: 'login-from',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule, LogoComponent],
	providers: [AuthService],
	templateUrl: './login-from.component.html',
	styleUrl: './login-from.component.css',
})
export class LoginFromComponent implements OnInit {
	constructor(
		private router: Router,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		const isLoggedIn = localStorage.getItem('email');
    this.router.navigate([''])
	}
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
			this.emailErrorMsg = this.validationHandle(this.loginForm.controls['email'], 'email');
			this.passErrorMsg = this.validationHandle(this.loginForm.controls['password'], 'password');
		}
	}

	loginHandle(res: { email: string; id: string }[]): void {
		if (res.length) {
			console.log('Login successed');
			const { email } = res[0];
			localStorage.setItem('email', email);
			this.router.navigate(['']);
		} else {
			console.log('Wrong user credentials');
			this.credintialsErrMsg = "The email and password you have entered don't match";
		}
	}

	validationHandle(controler: AbstractControl, ctrlName: string): string {
		let msg!: string;
		for (const err in controler.errors) {
			switch (err) {
				case 'required':
					msg = `the ${ctrlName} is required`;
					break;
				case 'email':
					msg = `the ${ctrlName} must be a valid email `;
					break;
				case 'minlength':
					msg = `the ${ctrlName} must be at least 8 characters`;
					break;
			}
		}

		return msg;
	}
}
