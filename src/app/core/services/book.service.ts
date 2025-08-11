import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private selectedBookSubject = new BehaviorSubject<Book | null>(null);
  public selectedBook$ = this.selectedBookSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getBooks(): Observable<Book[]> {
    return this.apiService.get<Book[]>('/books');
  }

  selectBook(book: Book): void {
    this.selectedBookSubject.next(book);
  }
}
