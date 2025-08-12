import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../core/models/book.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books$: Observable<Book[]>;
  selectedBook: Book | null = null;
  isLoading = true;

  constructor(private bookService: BookService) {
    this.books$ = this.bookService.getBooks();
  }

  ngOnInit(): void {
    this.loadBooks();
    this.bookService.selectedBook$.subscribe(book => {
      this.selectedBook = book;
    });
  }

  private loadBooks(): void {
    this.books$.subscribe({
      next: () => this.isLoading = false,
      error: (error) => {
        console.error('Error loading books:', error);
        this.isLoading = false;
      }
    });
  }

  selectBook(book: Book): void {
    this.bookService.selectBook(book);
  }

  isSelected(book: Book): boolean {
    return this.selectedBook?.url === book.url;
  }
}
