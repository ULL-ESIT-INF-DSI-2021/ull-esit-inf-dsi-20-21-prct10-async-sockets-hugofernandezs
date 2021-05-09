import {NoteManager} from './models/NoteManager/NoteManager';
import {Note, Color} from './models/NoteManager/Note';



const user: string = "Hugo";
const fm: NoteManager = new NoteManager();
const note1: Note = new Note("Nota1", Color.red, "Cuerpo 1");
const note2: Note = new Note("Nota2", Color.blue, "Cuerpo2");
const note3: Note = new Note("Nota3", Color.yellow, "Cuerpo3");
const userNotes: Note[] = [note1, note2];
const auxNotes: Note[] = [note1, note3];

console.log(fm.getNotes(user));
fm.removeNote(user, "Nota1");
fm.removeNote(user, "Nota2");
console.log(fm.getNotes(user));
