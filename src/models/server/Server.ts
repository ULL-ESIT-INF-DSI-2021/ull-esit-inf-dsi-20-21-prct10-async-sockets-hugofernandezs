import net from 'net';
import {ResponseType} from '../types';
import {ServerEventEmitter} from './ServerEventEmitter';
import {NoteManager} from '../NoteManager/NoteManager';
import {Note, Color} from '../NoteManager/Note';


const server = net.createServer((connection) => {
  console.log('\nServidor conectado\n');
  const emitter = new ServerEventEmitter(connection);
  let accion: boolean = true;

  emitter.on('request', (mensaje) => {
    const nm = new NoteManager(mensaje.user);
    let respuesta: ResponseType;

    switch (mensaje.type) {
      case 'add':
        accion = nm.addNote(mensaje.title, mensaje.body, mensaje.color);

        respuesta = {
          type: 'add',
          success: accion,
        };

        connection.write(`${JSON.stringify(respuesta)}\n`, () => {
          if (respuesta.success == true) {
            console.log(`Se ha procesado satisfactoriamente la petición "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          } else {
            console.log(`No se ha podido procesar la petición satisfactoriamente "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          }
          connection.end();
        });
        break;

      case 'update':
        let salida = '';
        if (typeof mensaje.newBody === 'string') {
          accion = nm.editNote(mensaje.title, "cuerpo", mensaje.newBody);

          respuesta = {
            type: 'update',
            success: accion,
            modified: 'body',
          };

          salida = JSON.stringify(respuesta);
        }
        if (typeof mensaje.newColor !== 'string') {
          accion = nm.editNote(mensaje.title, "color", mensaje.newColor);

          respuesta = {
            type: 'update',
            success: accion,
            modified: 'color',
          };

          salida = JSON.stringify(respuesta);
        }
        if (typeof mensaje.newTitle === 'string') {
          accion = nm.editNote(mensaje.title, "titulo", mensaje.newTitle);

          respuesta = {
            type: 'update',
            success: accion,
            modified: 'title',
          };

          salida = JSON.stringify(respuesta);
        }

        connection.write(`${salida}\n`, () => {
          if (respuesta.success == true) {
            console.log(`Se ha procesado satisfactoriamente la petición "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          } else {
            console.log(`No se ha podido procesar la petición satisfactoriamente "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          }
          connection.end();
        });
        break;

      case 'remove':
        accion = nm.removeNote(mensaje.title);

        respuesta = {
          type: 'remove',
          success: accion,
        };

        connection.write(`${JSON.stringify(respuesta)}\n`, () => {
          if (respuesta.success == true) {
            console.log(`Se ha procesado satisfactoriamente la petición "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          } else {
            console.log(`No se ha podido procesar la petición satisfactoriamente "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          }
          connection.end();
        });
        break;

      case 'list':
        const notas: Note[] = nm.notes;

        respuesta = {
          type: 'list',
          success: true,
          notes: [],
        };

        notas.forEach((nota) => {
          if (respuesta.notes != undefined) {
            respuesta.notes.push(nota);
          }
        });

        connection.write(`${JSON.stringify(respuesta)}\n`, () => {
          if (respuesta.success == true) {
            console.log(`Se ha procesado satisfactoriamente la petición "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          } else {
            console.log(`No se ha podido procesar la petición satisfactoriamente "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          }
          connection.end();
        });
        break;

      case 'read':
        const nota: Note | undefined = nm.getNote(mensaje.title);
        if (typeof nota !== "undefined") {
          respuesta = {
            type: 'read',
            success: true,
            notes: [nota],
          };
        } else {
          respuesta = {
            type: 'read',
            success: true,
            notes: undefined,
          };
        }

        connection.write(`${JSON.stringify(respuesta)}\n`, () => {
          if (respuesta.success == true) {
            console.log(`Se ha procesado satisfactoriamente la petición "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          } else {
            console.log(`No se ha podido procesar la petición satisfactoriamente "${respuesta.type}" del cliente y se ha enviado la respuesta.\n`);
          }
          connection.end();
        });
        break;

      default:
        break;
    }
  });


  connection.on('close', () => {
    console.log('Un cliente se ha desconectado\n');
  });
});

server.listen(2020, () => {
  console.log('\nEsperando a que los clientes se conecten\n');
});