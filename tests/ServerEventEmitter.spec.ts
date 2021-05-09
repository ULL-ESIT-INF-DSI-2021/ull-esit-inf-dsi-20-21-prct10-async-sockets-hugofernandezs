import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {ServerEventEmitter} from '../src/models/server/ServerEventEmitter';
import {RequestType} from '../src/models/types';


describe('Funcinamiento de la clase ServerEventEmitter', ()=> {
  describe('Funcionamiento de los eventos:', () => {
    it('Se emite una petición con todo el mensaje', ()=>{
      const socket = new EventEmitter();
      const server = new ServerEventEmitter(socket);

      server.on('request', (solicitud: RequestType) => {
        expect(solicitud.type).to.be.equal("add");
        expect(solicitud.user).to.be.equal("alu0101206479");
        expect(solicitud.title).to.be.equal("Red note");
        expect(solicitud.body).to.be.equal("This is a red note");
        expect(solicitud.color).to.be.equal("red");
      });

      socket.emit('data', '{"type": "add",');
      socket.emit('data', ' "user": "alu0101206479", ');
      socket.emit('data', `"title": "Red note", `);
      socket.emit('data', `"body": "This is a red note"`);
      socket.emit('data', `, "color": "red"}\n`);
    });
  });
});
