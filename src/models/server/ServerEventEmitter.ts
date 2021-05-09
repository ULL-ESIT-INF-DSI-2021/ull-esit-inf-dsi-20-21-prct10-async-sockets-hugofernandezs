import {EventEmitter} from 'events';
import net from 'net';

/**
 * Conects the server with the client.
 */
export class ServerEventEmitter extends EventEmitter {

  /**
   * Initialices the connection.
   * @param connection Connection with the server.
   */
  constructor(connection: EventEmitter) {
    super();

    let mensajeTexto = '';
    connection.on('data', (parteMensaje) => {
      mensajeTexto += parteMensaje.toString();

      let messageLimit = mensajeTexto.indexOf('\n');

      while (messageLimit !== -1) {
        const message = mensajeTexto.substring(0, messageLimit);
        mensajeTexto = mensajeTexto.substring(messageLimit + 1);
        this.emit('request', JSON.parse(message));
        messageLimit = mensajeTexto.indexOf('\n');
      }
    });
  }
}