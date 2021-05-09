/**
 * Contains the posible colors of a note.
 */
export enum Color {
  red = "red",
  yellow = "yellow",
  green = "green",
  blue = "blue",
  white = "white",
};


/**
 * Implements a user note.
 * @var title_ Title of the note.
 * @var color_ Color of the note.
 * @var body_ Body of the note_
 */
export class Note {
  private title_: string;
  private color_: Color;
  private body_: string;

  /**
   * Initialices the values.
   * @param newTitle Tittle of the note.
   * @param newColor Color of the note.
   * @param newBody Body of the note.
   */
  constructor(newTitle: string, newColor: Color, newBody: string) {
    this.title_ = newTitle;
    this.color_ = newColor;
    this.body_ = newBody;
  }

  /**
   * Formats the class in JSON format.
   * @returns The class in JSON format.
   */
  public getJSON(): string {
    let result: string = JSON.stringify(this);
    result = result.replace(/{/g, "{\n\t");
    result = result.replace(/:/g, ": ");
    result = result.replace(/,/g, ",\n\t");
    result = result.replace(/}/g, "\n}\n");
    return result;
  }


  /********************  GETTERS  ********************/

  /**
   * Returns the tittle of the note.
   */
  public get title(): string {
    return this.title_;
  }

  /**
   * Returns the color of the note.
   */
  public get color(): Color {
    return this.color_;
  }

  /**
   * Returns the body of the note.
   */
  public get body(): string {
    return this.body_;
  }


  /******************** SETTERS ********************/
  
  /**
   * Sets a new note tittle.
   */
  public set title(newTitle: string) {
    this.title_ = newTitle;
  }

  /**
   * Sets a new note color.
   */
  public set color(newColor: Color) {
    this.color_ = newColor;
  }

  /**
   * Sets a new note body.
   */
  public set body(newBody: string) {
    this.body_ = newBody;
  }
}
