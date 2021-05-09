import 'mocha';
import {expect} from 'chai';
import chalk from 'chalk';
import {NoteManager} from '../src/models/NoteManager/NoteManager';
import {Color, Note} from '../src/models/NoteManager/Note';

const user1: string = 'Usuario1';
const user2: string = 'Usuario2';

const note1: Note = new Note('Nota1', Color.red, 'Cuerpo 1');
const note2: Note = new Note('Nota2', Color.red, 'Cuerpo 2');

const nm = new NoteManager(user1);


describe('Funcionamiento de la clase NoteManager:', () => {
  describe('Se puede acceder a sus atributos:', () => {
    it('Se puede acceder a su nombre', () => {
      expect(nm.name).to.be.equal(user1);
    });
    it('Se puede acceder a sus notas', () => {
      expect(nm.notes).to.be.deep.equal([]);
    });
  });
  describe('Se pueden modificar sus atributos:', () => {
    it('Se puede modificar su nombre', () => {
      nm.name = user2;
      expect(nm.name).to.be.equal(user2);
      nm.name = user1
    });
    it('Se pueden modificar sus notas', () => {
      nm.notes = [note1];
      expect(nm.notes).to.be.deep.equal([note1]);
      nm.notes = [];
    });
  });
  describe('Se puede trabajar con notas:', () => {
    it('Se puede añadir una nota', () => {
      expect(nm.addNote(note1.title, note1.color, note1.body)).to.be.equal(true);
      expect(nm.addNote(note1.title, note1.color, note1.body)).to.be.equal(false);
    });
    it('Se puede obtener una nota', () => {
      expect(nm.getNote(note1.title)).to.be.equal(undefined);
      expect(nm.getNote(note2.title)).to.be.equal(undefined);
    });
    it('Se puede editar una nota', () => {
      expect(nm.editNote(note1.title, note1.title, note1.color, note2.body)).to.be.equal(true);
      expect(nm.editNote(note2.title, note1.title, note1.color, note2.body)).to.be.equal(false);
    });
    it('Se analiza todo el directorio', () => {
      const aux = new NoteManager(user1);
      aux.name = user1;
    });
    it('Se puede eliminar una nota', () => {
      expect(nm.removeNote(note1.title)).to.be.equal(true);
      expect(nm.removeNote(note2.title)).to.be.equal(false);
    });
  });
});
