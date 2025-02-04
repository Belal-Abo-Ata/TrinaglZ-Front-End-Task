import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
	faMagnifyingGlass,
	faPlus,
	faEye,
	faTrash,
	faPen,
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { BooksService } from '../../../Services/books.service';
import { HttpClientModule } from '@angular/common/http';
import BookInterface from '../../../Interfaces/books.interface';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../../delete-modal/delete-modal.component';

@Component({
	selector: 'app-list-books',
	standalone: true,
	imports: [FontAwesomeModule, RouterLink, HttpClientModule],
	providers: [BooksService],
	templateUrl: './list-books.component.html',
	styleUrl: './list-books.component.css',
})
export class ListBooksComponent implements OnInit {
	constructor(
		private library: FaIconLibrary,
		private bookSevice: BooksService,
		private dialog: MatDialog,
		private router: ActivatedRoute,
	) {
		library.addIcons(
			faMagnifyingGlass,
			faPlus,
			faPen,
			faTrash,
			faEye,
			faChevronLeft,
			faChevronRight,
		);
	}
	// -------------------- Variables ------------------------
	bookList!: Partial<BookInterface>[];
	bookListView!: Partial<BookInterface>[];
	bookListLength!: number;
	bookListPerPage: number = 6;
	bookListStart: number = 0;
	bookListEnd: number = this.bookListStart + this.bookListPerPage;
	bookPaginatedNumbers!: number[];
	bookPaginatedNumbersView!: number[];

	// TODO: implement the search functionality
	ngOnInit(): void {
		this.fetchBooks();
		this.router.queryParams.subscribe((params) => {
			if (params['refresh']) {
				this.fetchBooks();
			}
		});
	}

	fetchBooks() {
		this.bookSevice.getAllBokks().subscribe({
			next: (res) => {
				console.log(res);
				const books = res as BookInterface[];
				this.bookList = books.map((book) => {
					const { ISBN, title, author, category, version } = book;
					return { ISBN, title, author, category, version };
				});
				this.getPaginatedNumber();
				this.displayBookList(this.bookListStart, this.bookListEnd);
				this.renderPaginate(0);
			},
			error: (err: Error) => {
				console.error('Get books request has failed', err);
			},
		});
	}

	getPaginatedNumber(): void {
		this.bookListLength = this.bookList.length;
		const bookPaginatedNumbersLength: number = Math.ceil(
			this.bookListLength / this.bookListPerPage,
		);
		this.bookPaginatedNumbers = Array.from(
			{ length: bookPaginatedNumbersLength },
			(_, index) => index,
		);
	}

	displayBookList(start: number, end: number): void {
		this.bookListView = this.bookList.slice(start, end);
		this.getPaginatedNumber();
		this.renderPaginate(0);
	}

	renderPaginate(start: number) {
		const numbersPerPage: number = 5;
		this.bookPaginatedNumbersView = this.bookPaginatedNumbers.slice(start, numbersPerPage);
	}

	// changeActive() {

	// }

	changePage(destination: number): void {
		this.bookListStart = destination * this.bookListPerPage;
		this.bookListEnd = this.bookListStart + this.bookListPerPage;
		this.displayBookList(this.bookListStart, this.bookListEnd);
	}

	prevPage(): void {
		const destination: number = (this.bookListStart - this.bookListPerPage) / this.bookListPerPage;
		if (destination >= 0) {
			this.changePage(destination);
		}
	}

	nextPage(): void {
		const destination: number = (this.bookListStart + this.bookListPerPage) / this.bookListPerPage;
		if (destination <= this.bookPaginatedNumbers.length - 1) {
			this.changePage(destination);
		}
	}

	changePaginatedNumbers(number: number) {
		this.changePage(number);
	}

	deleteBook(ISBN: string | undefined) {
		console.log(`delete ${ISBN}`);
	}

	openModal(ISBN: string | undefined): void {
		const dialogRef = this.dialog.open(DeleteModalComponent, {
			width: '600px',
			enterAnimationDuration: '500ms',
			exitAnimationDuration: '300ms',
			data: { ISBN: ISBN },
		});
		dialogRef.afterClosed().subscribe((result) => {
			if (result !== 'closed') {
				this.bookList = this.bookList.filter((book) => book.ISBN !== result);
				this.displayBookList(this.bookListStart, this.bookListEnd);
			}
		});
	}

	// TODO: change the active page
	searchBook(e: Event) {
		const target = e.target as HTMLInputElement;
		const inputValue = target.value;
		if (inputValue) {
			this.bookListView = this.bookList.filter(
				(book) => book.title?.includes(inputValue) || book.author?.includes(inputValue),
			);
		} else {
			this.displayBookList(this.bookListStart, this.bookListEnd);
		}
	}
}
