import net from 'net';
import chalk from 'chalk';
import {ResponseType} from '../types';
import {ServerEventEmitter} from './ServerEventEmitter';
import {NoteManager} from '../NoteManager/NoteManager';
import {Note, Color} from '../NoteManager/Note';


const server = net.createServer((connection) => {
  console.log('\nServidor conectado\n');
  const emitter = new ServerEventEmitter(connection);
  //let action: boolean = true;

  emitter.on('request', (message) => {
    const nm = new NoteManager(message.user);
    let respuesta: ResponseType;

    switch (message.type) {
      case 'add': {
        const action: boolean = nm.addNote(message.title, message.body, message.color);
        respuesta = {
          type: 'add',
          success: action,
        };

        connection.write(`${JSON.stringify(respuesta)}\n`, () => {
          if (respuesta.success) {
            console.log(chalk.green(`Petición "${respuesta.type}" del cliente completada.\n`));
          } else {
            console.log(chalk.red(`Error al procesar la petición "${respuesta.type}" del cliente.\n`));
          }
          connection.end();
        });
        break;
      }
      case 'update':
        let output = '';
        if (typeof message.newBody === 'string') {
          const action: boolean = nm.editNote(message.title, "cuerpo", message.newBody);

          respuesta = {
            type: 'update',
            success: action,
            modified: 'body',
          };

          output = JSON.stringify(respuesta);
        }
        if (typeof message.newColor !== 'string') {
          const action: boolean = nm.editNote(message.title, "color", message.newColor);

          respuesta = {
            type: 'update',
            success: action,
            modified: 'color',
          };

          output = JSON.stringify(respuesta);
        }
        if (typeof message.newTitle === 'string') {
          const action: boolean = nm.editNote(message.title, "titulo", message.newTitle);

          respuesta = {
            type: 'update',
            success: action,
            modified: 'title',
          };

          output = JSON.stringify(respuesta);
        }

        connection.write(`${output}\n`, () => {
          if (respuesta.success == true) {
            console.log(chalk.green(`Petición "${respuesta.type}" del cliente completada.\n`));
          } else {
            console.log(chalk.red(`Error al procesar la petición "${respuesta.type}" del cliente.\n`));
          }
          connection.end();
        });
        break;

      case 'remove':
        const action: boolean = nm.removeNote(message.title);

        respuesta = {
          type: 'remove',
          success: action,
        };

        connection.write(`${JSON.stringify(respuesta)}\n`, () => {
          if (respuesta.success == true) {
            console.log(chalk.green(`Petición "${respuesta.type}" del cliente completada.\n`));
          } else {
            console.log(chalk.red(`Error al procesar la petición "${respuesta.type}" del cliente.\n`));
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
            console.log(chalk.green(`Petición "${respuesta.type}" del cliente completada.\n`));
          } else {
            console.log(chalk.red(`Error al procesar la petición "${respuesta.type}" del cliente.\n`));
          }
          connection.end();
        });
        break;

      case 'read':
        const nota: Note | undefined = nm.getNote(message.title);
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
            console.log(chalk.green(`Petición "${respuesta.type}" del cliente completada.\n`));
          } else {
            console.log(chalk.red(`Error al procesar la petición "${respuesta.type}" del cliente.\n`));
          }
          connection.end();
        });
        break;

      default:
        break;
    }
  });


  connection.on('close', () => {
    console.log(chalk.green('Un cliente se ha desconectado\n'));
  });
});

server.listen(2020, () => {
  console.log(chalk.green('\nEsperando a que los clientes se conecten\n'));
});