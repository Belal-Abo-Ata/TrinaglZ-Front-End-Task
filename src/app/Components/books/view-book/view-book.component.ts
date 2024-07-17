import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../../Services/books.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import BookInterface from '../../../Interfaces/books.interface';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';

@Component({
	selector: 'app-view-book',
	standalone: true,
	imports: [HttpClientModule, RouterModule, DatePipe],
	providers: [BooksService],
	templateUrl: './view-book.component.html',
	styleUrl: './view-book.component.css',
})
export class ViewBookComponent implements OnInit {
	constructor(
		private bookService: BooksService,
		private router: ActivatedRoute,
		private dialog: MatDialog,
		private route: Router,
	) {}

	ngOnInit(): void {
		this.ISBN = this.router.snapshot.params['isbn'];
		this.bookService.getBook(this.ISBN).subscribe({
			next: (res) => {
				const books = res as BookInterface[];
				this.book = books[0];
				console.log(this.book);
			},
			error: (err) => {
				console.log('Get Book Request Failed', err);
			},
		});
	}

	ISBN!: string;
	book!: Partial<BookInterface>;

	openModal(): void {
		const dialogRef = this.dialog.open(DeleteModalComponent, {
			width: '600px',
			enterAnimationDuration: '500ms',
			exitAnimationDuration: '300ms',
			data: { ISBN: this.ISBN },
		});
		dialogRef.afterClosed().subscribe((result) => {
			this.route.navigate(['/books'], { queryParams: { refresh: 'true' } });
		});
	}
}
