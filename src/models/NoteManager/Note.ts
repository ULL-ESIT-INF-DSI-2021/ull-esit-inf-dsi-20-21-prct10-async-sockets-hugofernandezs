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
 * @var title Title of the note.
 * @var color Color of the note.
 * @var body Body of the note_
 */
export class Note {
  private title_: string;
  private color_: Color;
  private body_: string;

  constructor(newTitle: string, newColor: Color, newBody: string) {
    this.title_ = newTitle;
    this.color_ = newColor;
    this.body_ = newBody;
  }


  /* GETTERS */

  /**
   * Returns the tittle of the note.
   */
  public get title() {
    return this.title_;
  }

  /**
   * Returns the color of the note.
   */
  public get color() {
    return this.color_;
  }

  /**
   * Returns the body of the note.
   */
  public get body() {
    return this.body_;
  }


  /* SETTERS */
  
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
