import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {ClientEventEmitter} from '../src/models/client/ClientEventEmitter';
import {ResponseType} from '../src/models/types';
import {Note, Color} from '../src/models/NoteManager/Note';

describe('Funcinamiento de la clase ClientEventEmitter', ()=> {
  describe('Funcionamiento de los eventos:', () => {
    it('Se emite una respuesta con todo el mensaje', ()=>{
      const socket = new EventEmitter();
      const client = new ClientEventEmitter(socket);
      const note: Note = new Note("Nota1", Color.red, "Cuerpo 1");
  
      client.on('response', (solicitud: ResponseType) => {
        expect(solicitud.type).to.be.equal("read");
        expect(solicitud.success).to.be.equal("true");
        expect(solicitud.notes).to.deep.equal([note]);
        expect(solicitud.modified).to.be.equal("title");
      });
  
      socket.emit('data', '{"type": "read", ');
      socket.emit('data', `"success": "true", "notes": [${JSON.stringify(note)}], `);
      socket.emit('data', `"modified": "title"}`);
      socket.emit('end');
    });
  });
});