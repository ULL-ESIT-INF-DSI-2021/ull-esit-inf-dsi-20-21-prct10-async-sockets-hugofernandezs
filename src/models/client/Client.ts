import net from 'net';
import yargs from 'yargs';
import chalk from 'chalk';
import {ResponseType, RequestType} from '../types';
import {ClientEventEmitter} from './ClientEventEmitter';


if (process.argv.length < 3) {
  console.log('\nIntroduzca un comando.\n');
} else {
  const client = net.connect({port: 2020});
  const emitter = new ClientEventEmitter(client);

  emitter.on('response', (respuesta: ResponseType) => {
    switch (respuesta.type) {
      case 'add':
        if (respuesta.success == true) {
          console.log(chalk.green('\nSe ha añadido la nota correctamente.\n'));
        } else {
          console.log(chalk.red("\nNo se ha podido añadir la nota.\n"));
        }
        break;

      case 'update':
        if (respuesta.success == true) {
          console.log(chalk.green('\nSe ha modificado la nota correctamente.\n'));
        } else {
          console.log(chalk.red("\nNo se ha podido modificar la nota.\n"));
        }
        break;

      case 'remove':
        if (respuesta.success == true) {
          console.log(chalk.green('\nSe ha eliminado la nota correctamente.\n'));
        } else {
          console.log(chalk.red("\nNo se ha podido eliminar la nota.\n"));
        }
        break;

      case 'list':
        console.log("\nNotas en la lista:\n");
        if (respuesta.notes == undefined || respuesta.notes == []) {
          console.log(chalk.red(`No se han encontrado notas.`));
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