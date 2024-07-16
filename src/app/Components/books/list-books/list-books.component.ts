import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
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
		this.bookSevice.getAllBokks().subscribe({
			next: (res) => {
				console.log(res);
				const books = res as BookInterface[];
				this.bookListLength = books.length;
				const bookPaginatedNumbersLength: number = Math.ceil(
					this.bookListLength / this.bookListPerPage,
				);
				this.bookPaginatedNumbers = Array.from(
					{ length: bookPaginatedNumbersLength },
					(_, index) => index,
				);
				this.bookList = books.map((book) => {
					const { ISBN, title, author, category, version } = book;
					return { ISBN, title, author, category, version };
				});
				this.displayBookList(this.bookListStart, this.bookListEnd);
				this.renderPaginate(0);
			},
			error: (err: Error) => {
				console.error('Get books request has failed', err);
			},
		});
	}

	displayBookList(start: number, end: number): void {
		this.bookListView = this.bookList.slice(start, end);
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
		if (destination > 0) {
			this.changePage(destination);
		}
	}

	nextPage(): void {
		const destination: number = (this.bookListStart + this.bookListPerPage) / this.bookListPerPage;
		if (destination <= this.bookListLength) {
			this.changePage(destination);
		}
	}

  // TODO: change the active page
	changePaginatedNumbers(number: number) {
    this.changePage(number)
  }

  deleteBook(ISBN: string | undefined) {
    console.log(`delete ${ISBN}`);
  }
}
