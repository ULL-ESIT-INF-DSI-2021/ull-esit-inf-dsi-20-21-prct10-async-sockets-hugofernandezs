import {EventEmitter} from 'events';

/**
 * Conects the cliente with the server.
 */
export class EventEmitterClient extends EventEmitter {
  
  /**
   * Initialices the connection.
   * @param connection Connection with the server.
   */
  constructor(connection: EventEmitter) {
    super();

    let data = '';
    connection.on('data', (parteMensaje) => {
      data += parteMensaje.toString();
    });

    connection.on('end', () => {
      this.emit('response', JSON.parse(data));
    });
  }
}