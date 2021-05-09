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

1. Un usuario solo puede interactuar con la aplicación de procesamiento de notas de texto a través de la línea de comandos del cliente. Los diferentes comandos, opciones de los mismos, así como manejadores asociados a cada uno de ellos deben gestionarse mediante el uso del paquete yargs.

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