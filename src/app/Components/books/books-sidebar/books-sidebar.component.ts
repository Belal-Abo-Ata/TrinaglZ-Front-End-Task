import { Component } from '@angular/core';
import { LogoComponent } from '../../logo/logo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faNewspaper } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'books-sidebar',
  standalone: true,
  imports: [LogoComponent, FontAwesomeModule],
  templateUrl: './books-sidebar.component.html',
  styleUrl: './books-sidebar.component.css'
})
export class BooksSidebarComponent {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faChevronLeft, faNewspaper);
  }

  // TODO: add the logic of go back
  goBack() {
    console.log("goBack");

  }
}
