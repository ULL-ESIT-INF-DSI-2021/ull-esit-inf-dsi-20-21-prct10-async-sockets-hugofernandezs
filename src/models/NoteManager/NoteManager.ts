import chalk from 'chalk';
import {Color, Note} from './Note';

/**
 * Implements a user file.
 * @var fs_ Node.js file system.
 * @var instance_ Single instance of the NoteManager.
 * @var folderPath_ Path to the notes folder.
 */
 export class NoteManager {
  private fs_ = require('fs');
  private name_: string;
  private notes_: Note[];

  /**
   * Inicializes the values.
   * @param name name of the user.
   */
  constructor(newName: string) {
    this.name_ = newName;
    this.notes_ = [];
    if (this.fs_.existsSync(`data/${this.name}`)) {
      const files = this.fs_.readdirSync(`data/${this.name}`);

      files.forEach((file: any) => {
        const data = this.fs_.readFileSync(`data/${this.name}/${file}`);
        const noteJson: Note = JSON.parse(data.toString());
        this.notes_.push(new Note(noteJson.title, noteJson.color, noteJson.body));
      });
    } else {
      this.fs_.mkdirSync(`data/${this.name}`);
    }
  }


  /********************  GETTERS  ********************/

  /**
   * Returns the username.
   */
  public get name(): string {
    return this.name_;
  }

  /**
   * Returns the user notes.
   */
  public get notes(): Note[] {
    return this.notes_;
  }


  /********************  SETTERS  ********************/

  /**
   * Sets a new username.
   */
  public set name(newName: string){
    this.name_ = newName;
    if (this.fs_.existsSync(`data/${this.name}`)) {
      const files = this.fs_.readdirSync(`data/${this.name}`);

      files.forEach((file: any) => {
        const data = this.fs_.readFileSync(`data/${this.name}/${file}`);
        const noteJson: Note = JSON.parse(data.toString());
        this.notes_.push(new Note(noteJson.title, noteJson.color, noteJson.body));
      });
    } else {
      this.fs_.mkdirSync(`data/${this.name}`);
    }
  }

  /**
   * Sets some new user notes.
   */
  public set notes(newNotes: Note[]) {
    this.notes_ = newNotes;
  }


  /*******************  FUNCTIONS  *******************/

  /**
   * Adds a new note.
   * @param title Note's title.
   * @param color Note's color.
   * @param body Notes body.
   * @returns True if the note is added. False if its not.
   */
  public addNote(title: string, color: Color, body: string): boolean {
    if (!this.fs_.existsSync(`data/${this.name}/${title}.json`)) {
      const note = new Note(title, color, body);
      this.notes_.push(note);
      this.fs_.writeFileSync(`data/${this.name}/${title}.json`, note.getJSON());
      return true;
    } else {
      return false;
    }
  }

  /**
   * Edits a note.
   * @param oldNote Note to edit.
   * @param noteTittle Tittle of the note.
   * @param noteColor Color of the note.
   * @param noteBody Body of the note
   * @returns 
   */
  public editNote(oldNote:string, noteTittle: string, noteColor: Color, noteBody: string): boolean {
    if (!this.fs_.existsSync(`data/${this.name}/${oldNote}.json`)) {
      return false;
    } else {
      const note: Note = JSON.parse(this.fs_.readFileSync(`data/${this.name}/${oldNote}.json`).toString());

      let indice: number = 0;
      let i = 0;
      this.notes_.forEach((note) => {
        if (note.title === oldNote) {
          note.title = noteTittle;
          note.color = noteColor;
          note.body = noteBody;
        }
      });
      return true;
    }
  }

  /**
   * Removes a note.
   * @param title Note to remove.
   * @returns True if the note is removed. False if its not.
   */
  public removeNote(title: string) {
    if (!this.fs_.existsSync(`data/${this.name}/${title}.json`)) {
      return false;
    } else {
      let indice: number = 0;
      let i = 0;
      this.notes_.forEach((note) => {
        if (note.title == title) {
          this.notes_.splice(this.notes_.indexOf(note), 1);
        }
      });
      this.fs_.rmSync(`data/${this.name}/${title}.json`);
      return true;
    }
  }

  /**
   * Reads a note.
   * @param titulo Note to read. 
   * @returns A string with the note. Or undefined.
   */
  public getNote(titulo: string): Note | undefined {
    if (!this.fs_.existsSync(`data/${this.name}/${titulo}.json`)) {
      return undefined;
    } else {
      this.notes_.forEach((note) => {
        if (note.title == titulo) {
          return note;
        }
      });
    } 
  }
}