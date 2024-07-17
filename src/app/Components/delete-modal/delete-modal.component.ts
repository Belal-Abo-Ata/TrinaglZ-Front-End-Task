import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
	MAT_DIALOG_DATA,
	MatDialogActions,
	MatDialogClose,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { BooksService } from '../../Services/books.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
	selector: 'app-delete-modal',
	standalone: true,
	imports: [
		MatButtonModule,
		MatDialogActions,
		MatDialogClose,
		MatDialogTitle,
		MatDialogContent,
		HttpClientModule,
	],
	providers: [BooksService],
	templateUrl: './delete-modal.component.html',
	styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
	constructor(
		public dialogRef: MatDialogRef<DeleteModalComponent>,
		@Inject(MAT_DIALOG_DATA) private data: { ISBN: string },
		private bookService: BooksService,
	) {}

	closeModal(): void {
		this.dialogRef.close('closed');
	}

	deleteBook() {
		console.log(`delete ${this.data.ISBN}`);
		this.bookService.deleteBook(this.data.ISBN).subscribe({
			next: (res) => {
				console.log(res);
			},
			error: (err) => {
				console.log(err);
			},
		});
		this.dialogRef.close(this.data.ISBN);
	}
}
