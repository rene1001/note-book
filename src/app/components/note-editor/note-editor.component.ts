import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.interface';

@Component({
  selector: 'app-note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css'
})
export class NoteEditorComponent implements OnInit {
  currentNote: Note | null = null;
  isNewNote = false;
  noteTitle = '';
  noteContent = '';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.selectedNote$.subscribe(note => {
      if (note) {
        this.currentNote = note;
        this.noteTitle = note.title;
        this.noteContent = note.content;
        this.isNewNote = false;
      } else {
        this.resetEditor();
        this.isNewNote = true;
      }
    });
  }

  saveNote(): void {
    if (this.isNewNote) {
      if (this.noteTitle.trim() || this.noteContent.trim()) {
        this.noteService.addNote({
          title: this.noteTitle || 'Sans titre',
          content: this.noteContent
        });
        this.resetEditor();
      }
    } else if (this.currentNote) {
      this.noteService.updateNote({
        ...this.currentNote,
        title: this.noteTitle || 'Sans titre',
        content: this.noteContent
      });
    }
  }

  resetEditor(): void {
    this.currentNote = null;
    this.noteTitle = '';
    this.noteContent = '';
  }
}
