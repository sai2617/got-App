import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'A Song of Ice and Fire Books';
  private audio = new Audio();
  isPlaying = false;

  ngOnInit() {
    this.audio.src = 'got-theme.mp3';
    this.audio.loop = true;
    this.audio.volume = 0.3;

    this.audio.addEventListener('loadstart', () => console.log('Audio loading started'));
    this.audio.addEventListener('canplay', () => console.log('Audio can play'));
    this.audio.addEventListener('error', (e) => console.error('Audio error:', e));
  }

  async playBackgroundMusic() {
    try {
      if (this.isPlaying) {
        this.pauseMusic();
      } else {
        console.log('Attempting to play audio...');
        console.log('Audio src:', this.audio.src);

        await this.audio.play();
        this.isPlaying = true;
        console.log('Audio playing successfully');
      }
    } catch (error) {
      console.error('Failed to play audio:', error);
      alert('Could not play audio. Check console for details.');
    }
  }

  pauseMusic() {
    this.audio.pause();
    this.isPlaying = false;
    console.log('Audio paused');
  }
}
