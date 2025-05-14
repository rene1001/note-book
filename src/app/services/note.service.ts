import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Note } from '../models/note.interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes: Note[] = [
    {
      id: 1,
      title: 'Première note',
      content: 'Contenu de la première note',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: 'Deuxième note',
      content: 'Contenu de la deuxième note',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private selectedNoteSubject = new BehaviorSubject<Note | null>(null);
  selectedNote$ = this.selectedNoteSubject.asObservable();

  private notesSubject = new BehaviorSubject<Note[]>(this.notes);
  notes$ = this.notesSubject.asObservable();

  constructor() {}

  getAllNotes(): Observable<Note[]> {
    return this.notes$;
  }

  getNoteById(id: number): Note | undefined {
    return this.notes.find(note => note.id === id);
  }

  selectNote(note: Note): void {
    this.selectedNoteSubject.next(note);
  }

  addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): void {
    const newNote: Note = {
      ...note,
      id: this.getNextId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.notes = [...this.notes, newNote];
    this.notesSubject.next(this.notes);
  }

  updateNote(updatedNote: Note): void {
    this.notes = this.notes.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date() } : note
    );
    this.notesSubject.next(this.notes);
  }

  deleteNote(id: number): void {
    this.notes = this.notes.filter(note => note.id !== id);
    this.notesSubject.next(this.notes);
    
    // Si la note supprimée était sélectionnée, désélectionner
    const currentSelected = this.selectedNoteSubject.value;
    if (currentSelected && currentSelected.id === id) {
      this.selectedNoteSubject.next(null);
    }
  }

  private getNextId(): number {
    return this.notes.length > 0 
      ? Math.max(...this.notes.map(note => note.id)) + 1 
      : 1;
  }
}