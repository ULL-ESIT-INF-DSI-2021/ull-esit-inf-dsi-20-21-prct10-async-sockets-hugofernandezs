import 'mocha';
import {expect} from 'chai';
import {Color, Note} from '../src/models/NoteManager/Note';

const title1: string = "Título 1";
const color1: Color = Color.red;
const body1: string = "Cuerpo 1";

const title2: string = "Título 2";
const color2: Color = Color.blue;
const body2: string = "Cuerpo 2";

const note: Note = new Note(title1, color1, body1);

let json: string = `{\n\t"title_": "${title2}",\n\t"color_": "${color2}",`;
json += `\n\t"body_": "${body2}"\n}\n`;


describe('Funcionamiento de la clase Note:', () => {
  describe('Se puede acceder a sus atributos:', () => {
    it('Se pueden acceder al título de la nota', () => {
      expect(note.title).to.be.equal(title1);
    });
    it('Se pueden acceder al color de la nota', () => {
      expect(note.color).to.be.equal(color1);
    });
    it('Se pueden acceder al cuerpo de la nota', () => {
      expect(note.body).to.be.equal(body1);
    });
  });

  describe('Se pueden modificar sus atributos:', () => {
    it('Se puede modificar el título de la nota', () => {
      note.title = title2;
      expect(note.title).to.be.equal(title2);
    });
    it('Se puede modificar el color de la nota', () => {
      note.color = color2;
      expect(note.color).to.be.equal(color2);
    });
    it('Se puede modificar el cuerpo de la nota', () => {
      note.body = body2;
      expect(note.body).to.be.equal(body2);
    });
  });
  describe('Se puede trabajar en formato JSON:', () => {
    it('Se puede obtener una cadena en formato JSON', () => {
      expect(note.getJSON()).to.be.equal(json);
    });
  });
});
