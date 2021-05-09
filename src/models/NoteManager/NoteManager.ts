import {Note} from './Note'

/**
 * Implements a user file.
 * @var fs_ Node.js file system.
 * @var instance_ Single instance of the NoteManager.
 * @var folderPath_ Path to the notes folder.
 */
 export class NoteManager {
  private fs_ = require('fs');
  private static instance_: NoteManager;
  private readonly folderPath_: string;


  /**
   * Constructor.
   * Checks if the data folder exists. If not, it creates a new one.
   */
  public constructor() {
    this.folderPath_ = "./data";
    if (!this.fs_.existsSync(this.folderPath_)) {
      this.fs_.mkdirSync(this.folderPath_, {recursive: true});
    }
  }
}
