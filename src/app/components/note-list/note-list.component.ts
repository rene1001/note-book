import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.interface';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  selectedNoteId: number | null = null;

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getAllNotes().subscribe(notes => {
      this.notes = notes;
    });

    this.noteService.selectedNote$.subscribe(note => {
      this.selectedNoteId = note?.id || null;
    });
  }

  selectNote(note: Note): void {
    this.noteService.selectNote(note);
  }

  createNewNote(): void {
    this.noteService.selectNote(null);
  }

  deleteNote(event: Event, id: number): void {
    event.stopPropagation();
    this.noteService.deleteNote(id);
  }
}
