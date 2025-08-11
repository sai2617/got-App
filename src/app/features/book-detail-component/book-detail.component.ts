import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../core/services/book.service';
import { CharacterService } from '../../core/services/character.service';
import { Book } from '../../core/models/book.model';
import { Character } from '../../core/models/character.model';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  selectedBook: Book | null = null;
  characters: Character[] = [];
  isLoadingCharacters = false;


  constructor(
    private bookService: BookService,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.bookService.selectedBook$.subscribe(book => {
      this.selectedBook = book;
      if (book) {
        this.loadCharacters(book.characters);
      } else {
        this.characters = [];
      }
    });
  }

  private loadCharacters(characterUrls: string[]): void {
    if (characterUrls.length === 0) {
      this.characters = [];
      return;
    }

    this.isLoadingCharacters = true;

    this.characterService.getCharactersByUrls(characterUrls).subscribe({
      next: (characters) => {
        this.characters = characters;
        this.isLoadingCharacters = false;
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.isLoadingCharacters = false;
      }
    });
  }

  openCharacterModal(character: Character): void {
    const event = new CustomEvent('openCharacterModal', {
      detail: character
    });
    window.dispatchEvent(event);
  }

  trackByUrl(index: number, character: Character): string {
    return character.url;
  }
}
