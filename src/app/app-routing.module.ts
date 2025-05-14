import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';

const routes: Routes = [
  { path: '', component: NoteListComponent },  // Route par défaut
  { path: 'new', component: NoteEditorComponent },
  { path: 'edit/:id', component: NoteEditorComponent },
  { path: '**', redirectTo: '' }  // Redirection pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }