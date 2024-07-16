import { Component } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';

@Component({
	selector: 'app-add-book',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './add-book.component.html',
	styleUrl: './add-book.component.css',
})
export class AddBookComponent {
	inputFields = [
		{
			placeholder: 'book title',
			type: 'text',
			required: true,
		},
		{
			placeholder: 'book author',
			type: 'text',
			required: true,
		},
		{
			placeholder: 'categories',
			type: 'text',
			required: true,
		},
		{
			placeholder: 'book price',
			type: 'text',
			required: true,
		},
		{
			placeholder: 'book version',
			type: 'text',
			required: true,
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
		},
		{
			placeholder: 'book ISBN',
			type: 'text',
			required: true,
		},
		{
			placeholder: 'book release date',
			type: 'date',
			required: false,
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
}
