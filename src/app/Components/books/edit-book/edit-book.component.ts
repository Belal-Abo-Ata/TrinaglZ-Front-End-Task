import { Component, OnInit } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../../Services/books.service';
import { HttpClientModule } from '@angular/common/http';
import BookInterface from '../../../Interfaces/books.interface';

@Component({
	selector: 'app-edit-book',
	standalone: true,
	imports: [ReactiveFormsModule, HttpClientModule],
	providers: [BooksService],
	templateUrl: '../add-book/add-book.component.html',
	styleUrl: './edit-book.component.css',
})
export class EditBookComponent implements OnInit {
	constructor(
		private router: ActivatedRoute,
		private route: Router,
		private bookService: BooksService,
	) {}

	ISBN!: string;
	book!: Partial<BookInterface>;

	ngOnInit(): void {
		this.ISBN = this.router.snapshot.params['isbn'];
		this.bookService.getBook(this.ISBN).subscribe({
			next: (res) => {
				const books = res as BookInterface[];
				this.book = books[0];
				console.log(this.book);
				this.setDataToForm(this.book);
			},
			error: (err) => {
				console.log('Get Book Request Failed', err);
			},
		});
	}

	setDataToForm(book: Partial<BookInterface>) {
		for (const book in this.addBookForm.controls) {
			this.addBookForm.controls[book].setValue(this.book[book]);
		}
		this.addBookForm.controls['title'].setValue(this.book.title);
		this.addBookForm.controls['category'].setValue(this.book.category);
	}

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
			placeholder: '',
			required: false,
			type: 'text',
			formControl: 'title',
		},
		{ placeholder: '', required: false, type: 'text', formControl: 'author' },
		{ placeholder: '', required: false, type: 'text', formControl: 'category' },
		{ placeholder: '', required: false, type: 'text', formControl: 'price' },
		{ placeholder: '', required: false, type: 'text', formControl: 'version' },
		{ placeholder: '', required: false, type: 'select', selectOptions: ['v1', 'v2', 'v3'] },
		{
			placeholder: 'book edition',
			required: false,
			type: 'text',
			formControl: 'edition',
		},
		{
			placeholder: '',
			required: false,
			type: 'text',
			formControl: 'ISBN',
		},
		{
			placeholder: '',
			required: false,
			type: 'date',
			formControl: 'date',
		},
	];

	onInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.value) {
			target.previousElementSibling?.classList.add('hidden');
		} else {
			target.previousElementSibling?.classList.remove('hidden');
		}
	}

	cancelHandle() {
		this.route.navigate(['/books']);
	}

	saveBook(e: Event) {
		e.preventDefault();
		let data: {
			[key: string]: any;
		} = {};
		for (const control in this.addBookForm.controls) {
			data[control] = this.addBookForm.controls[control].value;
		}
		data = { id: data['ISBN'], ...data };
		console.log(data);
		this.bookService.editBook(this.ISBN, data).subscribe({
			next: (res) => {
				console.log(res);
			},
			error: (err) => {
				console.log(err);
			},
		});
		this.route.navigate(['/books'], { queryParams: { refresh: 'true' } });
	}
}
