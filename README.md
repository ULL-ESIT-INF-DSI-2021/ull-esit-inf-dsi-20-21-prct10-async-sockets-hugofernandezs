# Práctica 10 - Cliente y servidor para una aplicación de procesamiento de notas de texto

<p align="center">
    <a href="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-hugofernandezs/actions/workflows/tests.yml">
        <img alt="Tests" src="https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-hugofernandezs/actions/workflows/tests.yml/badge.svg">
    </a>
    <a href='https://coveralls.io/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-hugofernandezs?branch=main'>
        <img src='https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct10-async-sockets-hugofernandezs/badge.svg?branch=main' alt='Coverage Status' />
    </a>
    <a href='https://sonarcloud.io/dashboard?id=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct10-async-sockets-hugofernandezs'>
        <img src='https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2021_ull-esit-inf-dsi-20-21-prct10-async-sockets-hugofernandezs&metric=alert_status' alt='Quality Gate Status' />
    </a>
</p>


## Enunciado
Los requisitos que debe cumplir la aplicación de procesamiento de notas de texto son los enumerados a continuación:

1. La aplicación de notas deberá permitir que múltiples usuarios interactúen con ella.

2. Una nota estará formada, como mínimo, por un título, un cuerpo y un color (rojo, verde, azul o amarillo).

3. Cada usuario tendrá su propia lista de notas, con la que podrá llevar a cabo las siguientes operaciones:

Añadir una nota a la lista. Antes de añadir una nota a la lista se debe comprobar si ya existe una nota con el mismo título. En caso de que así fuera, deberá mostrarse un mensaje de error por la consola del cliente. En caso contrario, se añadirá la nueva nota a la lista y se mostrará un mensaje informativo por la consola del cliente.

- Modificar una nota de la lista. Antes de modificar una nota, previamente se debe comprobar que exista una nota con el título de la nota a modificar en la lista. Si existe, se procede a su modificación y se emite un mensaje informativo por la consola del cliente. En caso contrario, debe mostrarse un mensaje de error por la consola del cliente.

- Eliminar una nota de la lista. Antes de eliminar una nota, previamente se debe comprobar que exista una nota con el título de la nota a eliminar en la lista. Si existe, se procede a su eliminación y se emite un mensaje informativo por la consola del cliente. En caso contrario, debe mostrarse un mensaje de error por la consola del cliente.

- Listar los títulos de las notas de la lista. Los títulos de las notas deben mostrarse por la consola del cliente con el color correspondiente de cada una de ellas. Use el paquete chalk para ello.

- Leer una nota concreta de la lista. Antes de mostrar el título y el cuerpo de la nota que se quiere leer, se debe comprobar que en la lista existe una nota cuyo título sea el de la nota a leer. Si existe, se mostrará el título y cuerpo de la nota por la consola del cliente con el color correspondiente de la nota. Para ello, use el paquete chalk. En caso contrario, se mostrará un mensaje de error por la consola del cliente.

- Todos los mensajes informativos se mostrarán con color verde, mientras que los mensajes de error se mostrarán con color rojo. Use el paquete chalk para ello.

- El servidor es responsable de hacer persistente la lista de notas de cada usuario.

    - Guardar cada nota de la lista en un fichero con formato JSON. Los ficheros JSON correspondientes a las notas de un usuario concreto deberán almacenarse en un directorio con el nombre de dicho usuario.

    - Cargar una nota desde los diferentes ficheros con formato JSON almacenados en el directorio del usuario correspondiente.

- Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos del cliente. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete yargs.

```bash
~$ node dist/note-app.js add --user="edusegre" --title="Red note" --body="This is a red note" --color="red"
New note added!
~$ node dist/note-app.js list --user="edusegre"
Your notes
Red note
~$ node dist/note-app.js add --user="edusegre" --title="Red note" --body="This is a second red note" --color="red"
Note title taken!
~$ node dist/note-app.js add --user="edusegre" --title="Yellow note" --body="This is a yellow note" --color="yellow"
New note added!
~$ node dist/note-app.js list --user="edusegre" 
Your notes
Red note
Yellow note
~$ node dist/note-app.js read --user="edusegre" --title="Red note"
Red note
This is a red note
~$ node dist/note-app.js read --user="edusegre" --title="Yellow note"
Yellow note
This is a yellow note
~$ node dist/note-app.js read --user="edusegre" --title="Black note"
Note not found
~$ node dist/note-app.js remove --user="edusegre" --title="Red note"
Note removed!
~$ node dist/note-app.js list --user="edusegre" 
Your notes
Yellow note
~$ node dist/note-app.js remove --user="edusegre" --title="Black note"
No note found
```


## Consejos sobre la implementación

- Tendrá que implementar lo que se conoce como el patrón petición-respuesta, es decir, el cliente lleva a cabo una petición al servidor conectándose al mismo, el servidor procesa la petición, prepara y envía una respuesta de vuelta al cliente, cierra la conexión con el cliente y el cliente procesa la respuesta recibida.

- Todos los mensajes intercambiados entre el cliente y el servidor deben ser representaciones en cadena de objetos JSON válidos. Recuerde que un objeto JSON puede serializarse y deserializarse gracias al uso de los métodos JSON.stringify y JSON.parse, respectivamente.

- El cliente no puede utilizar el método end del socket de comunicación con el servidor para indicar que ha terminado de enviar una petición al servidor dado que, si lo hiciera, el servidor no podrá escribir la respuesta de vuelta al cliente en dicho socket. Piense, entonces, cómo podría hacer para que, dada una petición enviada por el cliente a través del socket, el servidor sea capaz de detectar que ha recibido una petición completa para, a continuación, hacer que el socket emita un evento request. Una vez hecho lo anterior, en el servidor, tendrá que añadir un manejador que se ejecute cada vez que el socket emita un evento de tipo request.

- Toda la lógica de negocio asociada a la gestión del sistema de ficheros tendrá que estar implementada en el lado del servidor. El servidor deberá ser capaz de procesar una petición. En primer lugar, deberá ser capaz de identificar el tipo de petición que ha recibido desde un cliente para, seguidamente, llevar a cabo las comprobaciones y operaciones necesarias con el sistema de ficheros. Además, deberá ser capaz de construir y enviar un mensaje de respuesta al cliente, el cual puede ser satisfactorio o no. Una vez enviado dicho mensaje, deberá cerrar el lado cliente del socket.

- Toda la lógica de negocio asociada al paso de parámetros desde línea de comandos y su procesamiento mediante yargs tendrá que estar implementada en el lado del cliente. El cliente deberá ser capaz de enviar una petición a un cliente. Para ello, deberá ser capaz de construir un mensaje en el que sea capaz de informar al servidor del tipo de operación que quiere llevar a cabo. Además, deberá ser capaz de recibir una respuesta del servidor y procesarla. Por ejemplo, si el cliente ha solicitado al servidor la lectura de una nota concreta y el servidor ha respondido con una respuesta satisfactoria (porque la nota existe), dicha respuesta contendrá la información de la nota que se desea leer. El cliente deberá mostrar la nota recibida en la petición por la consola utilizando chalk.

- Puede definir sus propios tipos o clases para las peticiones y respuestas en su aplicación, aunque se recomienda que, al menos, contengan los siguientes elementos de información:

```typescript
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  title?: string;
  body?: string;
  color?: Color;
}

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Note[];
}
```


## Desarrollo

Para el desarrollo de esta práctica hemos utilizado la práctica 8 de manejo de notas. Puede consultar el guión en este [enlace](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-hugofernandezs#readme). Además hemos creado una paqueña aplicación cliente-servidor que se encarge de manejar las peticiones del usuario. Además nos hemos apoyado en un tipo de datos que nosotros hemos creado para las peticiones y respuestas

#### Request type
Contiene toda la información necesaria para hacer un apetición.
```typescript
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  user: string;
  title?: string;
  body?: string;
  color?: string;
  newTitle?: string;
  newBody?: string;
  newColor?: string;
}
```

#### Response type
Contiene toda la información necesaria para resivir una respuesta.
```typescript
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  notes?: Note[];
  modified?: string;
}
```

### Cliente
Será el programa que se encargue de realizar las peticiones al servidor. Utiliza el paquete yargs para anañizar la línea de comandos, pues pasaremos a través de esta todas nuestras peticiones. Además emplea un objeto EventEmitter que hemos personalizado. El funcionamiento básico es que recibe una instrucción, la analiza y manda la petición al servidor. Se queda esperando hasta que resive respuesta y finaliza la ejecución mosrando el resultado de la petición.

```typescript
  emitter.on('response', (respuesta: ResponseType) => {
    switch (respuesta.type) {
      case 'add':
        if (respuesta.success == true) {
          console.log(chalk.green('\nNew note added!\n'));
        } else {
          console.log(chalk.red("\nNote title taken!\n"));
        }
        break;

      case 'update':
        if (respuesta.success == true) {
          if (respuesta.modified == "title") {
            console.log(chalk.green('\nNote title modified!\n'));
          }
          if (respuesta.modified == "body") {
            console.log(chalk.green('\nNote body modified!\n'));
          }
          if (respuesta.modified == "color") {
            console.log(chalk.green('\nNote color modified!\n'));
          }
        } else {
          console.log(chalk.red("\nNo note found\n"));
        }
        break;

      case 'remove':
        if (respuesta.success == true) {
          console.log(chalk.green('\nNote removed!\n'));
        } else {
          console.log(chalk.red("\nNo note found\n"));
        }
        break;

      case 'list':
        console.log("\nYour notes\n");
        if (respuesta.notes == undefined || respuesta.notes == []) {
          console.log(chalk.red(`No notes found`));
        } else {
          respuesta.notes.forEach((nota) => {
            switch (nota.color) {
              case "red":
                console.log(chalk.red(`${nota.title}`));
                break;
              case "green":
                console.log(chalk.green(`${nota.title}`));
                break;
              case "blue":
                console.log(chalk.blue(`${nota.title}`));
                break;
              case "yellow":
                console.log(chalk.yellow(`${nota.title}`));
                break;
              default:
                break;
            }
          });
        }
        console.log();
        break;

      case 'read':
        if (respuesta.success == true) {
          if (respuesta.notes != undefined) {
            switch (respuesta.notes[0].color) {
              case "red":
                console.log(chalk.red(`\n${respuesta.notes[0].title}`));
                console.log(chalk.red(`${respuesta.notes[0].body}\n`));
                break;
              case "green":
                console.log(chalk.green(`\n${respuesta.notes[0].title}`));
                console.log(chalk.green(`${respuesta.notes[0].body}\n`));
                break;
              case "blue":
                console.log(chalk.blue(`\n${respuesta.notes[0].title}`));
                console.log(chalk.blue(`${respuesta.notes[0].body}\n`));
                break;
              case "yellow":
                console.log(chalk.yellow(`\n${respuesta.notes[0].title}`));
                console.log(chalk.yellow(`${respuesta.notes[0].body}\n`));
                break;
              default:
                break;
            }
          }
        } else {
          console.log(chalk.red("\nNote not found\n"));
        }
        break;

      default:
        break;
    }
  });

  yargs.command( {
    command: 'add',
    describe: 'Add a new note',
    builder: {
      user: {
        describe: 'User',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string',
      },
      color: {
        describe: 'Note color',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv: { user: any; title: any; body: any; color: any; }) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
        const comando: RequestType = {
          type: 'add',
          user: argv.user,
          title: argv.title,
          body: argv.body,
          color: argv.color,
        };

        client.write(`${JSON.stringify(comando)}\n`, (err) => {
          if (err) {
            console.log(`\nNo se ha podido enviar el mensaje ${JSON.stringify(comando)} al servidor`);
          }
        });
      }
    },
  });


  yargs.command( {
    command: 'update',
    describe: 'Update a note',
    builder: {
      user: {
        describe: 'User',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
      newTitle: {
        describe: 'New note title',
        demandOption: false,
        type: 'string',
      },
      newBody: {
        describe: 'New note title',
        demandOption: false,
        type: 'string',
      },
      newColor: {
        describe: 'New note title',
        demandOption: false,
        type: 'string',
      },
    },
    handler(argv: { user: any; title: any; newBody: string | undefined; newColor: string | undefined; newTitle: string | undefined; }) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string') {
        const comando: RequestType = {
          type: 'update',
          user: argv.user,
          title: argv.title,
        };
        if (typeof argv.newBody === 'string') {
          comando.newBody = argv.newBody;
        }
        if (typeof argv.newColor === 'string') {
          comando.newColor = argv.newColor;
        }
        if (typeof argv.newTitle === 'string') {
          comando.newTitle = argv.newTitle;
        }

        client.write(`${JSON.stringify(comando)}\n`, (err) => {
          if (err) {
            console.log(`\nNo se ha podido enviar el mensaje ${JSON.stringify(comando)} al servidor`);
          }
        });
      }
    },
  });

  yargs.command( {
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      user: {
        describe: 'User',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv: { user: any; title: any; }) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string') {
        const comando: RequestType = {
          type: 'remove',
          user: argv.user,
          title: argv.title,
        };

        client.write(`${JSON.stringify(comando)}\n`, (err) => {
          if (err) {
            console.log(`\nNo se ha podido enviar el mensaje ${JSON.stringify(comando)} al servidor`);
          }
        });
      }
    },
  });

  yargs.command( {
    command: 'list',
    describe: 'List notes of a concrect user',
    builder: {
      user: {
        describe: 'User',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv: { user: any; }) {
      if (typeof argv.user === 'string') {
        const comando: RequestType = {
          type: 'list',
          user: argv.user,
        };

        client.write(`${JSON.stringify(comando)}\n`, (err) => {
          if (err) {
            console.log(`\nNo se ha podido enviar el mensaje ${JSON.stringify(comando)} al servidor`);
          }
        });
      }
    },
  });

  yargs.command( {
    command: 'read',
    describe: 'Read a note',
    builder: {
      user: {
        describe: 'User',
        demandOption: true,
        type: 'string',
      },
      title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv: { user: any; title: any; }) {
      if (typeof argv.user === 'string' && typeof argv.title === 'string') {
        const comando: RequestType = {
          type: 'read',
          user: argv.user,
          title: argv.title,
        };

        client.write(`${JSON.stringify(comando)}\n`, (err) => {
          if (err) {
            console.log(`\nNo se ha podido enviar el mensaje ${JSON.stringify(comando)} al servidor`);
          }
        });
      }
    },
  });
}

yargs.argv;
```

#### ClientEventEmitter
Es el objeto que utilizaremos para controlar los eventos. Cad avez que llega una respuesta al cliente este objeto la procesará.

```typescript
export class ClientEventEmitter extends EventEmitter {

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
```


### Servidor
Su funcionalidad es similar a la del cliente. Crea un objeto EventEmitter personalizado y espera a que e llegue una petición. La principal diferencia con el servidor es la pasividad a la espera de ejecutarse, pues no realiza ninguna acción si el cliente no se lo pide. La segunda diferencia es que no se pude interactuar con el a través de la linea de comandos. La única opción es a través del cliente. 

Resivirá una petición del cliente, la analizará y la ejecutará para luego devolver una respuesta con el resultado.

```typescript
```