import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './features/book-list-component/book-list.component';
import { BookDetailComponent } from './features/book-detail-component/book-detail.component';
import { CharacterModalComponent } from './features/character-modal-component/character-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    BookListComponent,
    BookDetailComponent,
    CharacterModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'A Song of Ice and Fire Books';
}
