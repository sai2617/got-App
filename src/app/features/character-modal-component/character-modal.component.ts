import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../core/models/character.model';
import { CharacterService } from '../../core/services/character.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-character-modal',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './character-modal.component.html',
  styleUrls: ['./character-modal.component.scss']
})
export class CharacterModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  character: Character | null = null;

  fatherName = '';
  motherName = '';
  spouseName = '';

  isLoading = false;

  private modalListener?: (event: any) => void;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.modalListener = (event: any) => {
      this.ngZone.run(() => {
        console.log('Modal event received:', event.detail);
        this.character = event.detail;
        this.isOpen = true;
        this.loadFamilyMembers();
        this.cdr.detectChanges();
      });
    };
    window.addEventListener('openCharacterModal', this.modalListener);
  }

  ngOnDestroy(): void {
    if (this.modalListener) {
      window.removeEventListener('openCharacterModal', this.modalListener);
    }
  }

  closeModal(): void {
    this.isOpen = false;
    setTimeout(() => {
      this.character = null;
      this.fatherName = '';
      this.motherName = '';
      this.spouseName = '';
      this.cdr.detectChanges();
    }, 300);
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  isCourtier(character: Character): boolean {
    return character?.titles?.length > 0 || character?.allegiances?.length > 0;
  }

  hasGenealogyInfo(character: Character): boolean {
    return !!(character.father || character.mother || character.spouse);
  }

  getHouseName(url: string): string {
    return url.split('/').pop() || 'Unknown House';
  }

  private loadFamilyMembers(): void {
    if (!this.character) return;

    const familyUrls = [
      this.character.father,
      this.character.mother,
      this.character.spouse
    ].filter(url => !!url);

    if (familyUrls.length === 0) return;

    this.isLoading = true;
    this.characterService.getCharactersByUrls(familyUrls).subscribe({
      next: members => {
        members.forEach(member => {
          if (member.url === this.character?.father) {
            this.fatherName = member.name || 'Unknown';
          }
          if (member.url === this.character?.mother) {
            this.motherName = member.name || 'Unknown';
          }
          if (member.url === this.character?.spouse) {
            this.spouseName = member.name || 'Unknown';
          }
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
