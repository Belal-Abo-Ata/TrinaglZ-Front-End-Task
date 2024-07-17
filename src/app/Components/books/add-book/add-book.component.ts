import { Component } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import BookInterface from '../../../Interfaces/books.interface';
import { BooksService } from '../../../Services/books.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-add-book',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule],
  providers: [BooksService],
	templateUrl: './add-book.component.html',
	styleUrl: './add-book.component.css',
})
export class AddBookComponent {
	constructor(private router: Router, private bookService: BooksService) {}

	addBookForm: FormGroup = new FormGroup(
		{
			title: new FormControl('', [Validators.required]),
			author: new FormControl('', [Validators.required]),
			category: new FormControl('', [Validators.required]),
			price: new FormControl('', [Validators.required, Validators.pattern(/\d+(\.\d{1,2})?/g)]),
			version: new FormControl('', [Validators.required]),
			edition: new FormControl('', []),
			ISBN: new FormControl('', [
				Validators.required,
				Validators.pattern(/^(?:\d[\-\d]{0,12}){10,13}$/g),
				Validators.maxLength(13),
			]),
			date: new FormControl('', []),
			brief: new FormControl('', [Validators.required, Validators.maxLength(800)]),
		},
		{ updateOn: 'change' },
	);

	inputFields = [
		{
			placeholder: 'book title',
			type: 'text',
			required: true,
			formControl: 'title',
		},
		{
			placeholder: 'book author',
			type: 'text',
			required: true,
			formControl: 'author',
		},
		{
			placeholder: 'categories',
			type: 'text',
			required: true,
			formControl: 'category',
		},
		{
			placeholder: 'book price',
			type: 'text',
			required: true,
			formControl: 'price',
		},
		{
			placeholder: 'book version',
			type: 'text',
			required: true,
			formControl: 'version',
		},
		{
			placeholder: 'book old version',
			type: 'select',
			selectOptions: ['v1', 'v2', 'v3'],
			required: false,
		},
		{
			placeholder: 'book edition',
			type: 'text',
			required: false,
			formControl: 'edition',
		},
		{
			placeholder: 'book ISBN',
			type: 'text',
			required: true,
			formControl: 'ISBN',
		},
		{
			placeholder: 'book release date',
			type: 'date',
			required: false,
			formControl: 'date',
		},
	];

	onInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.value) {
			target.nextElementSibling?.classList.add('!hidden');
		} else {
			target.nextElementSibling?.classList.remove('!hidden');
		}
	}

	cancelHandle() {
		this.router.navigate(['/books']);
	}

	saveBook(e: Event) {
		e.preventDefault();
		let data: {
			[key: string]: any;
		} = {};
		for (const control in this.addBookForm.controls) {
			data[control] = this.addBookForm.controls[control].value;
		}
    data = {id: data['ISBN'], ...data};
    console.log(data);
    this.bookService.addBook(data).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: (err) => {
        console.log(err);
      }
    });
    this.router.navigate(['/books'], { queryParams: { refresh: 'true' } })
	}

	// validationHandle(controler: AbstractControl, ctrlName: string): string {
	// 	let msg!: string;
	// 	for (const err in controler.errors) {
	// 		switch (err) {
	// 			case 'required':
	// 				msg = `the ${ctrlName} is required`;
	// 				break;
	// 			case 'maxlength':
	// 				msg = `the ${ctrlName} must be ${err.requiredLength} `;
	// 				break;
	// 		}
	// 	}

	// 	return msg;
	// }
}
