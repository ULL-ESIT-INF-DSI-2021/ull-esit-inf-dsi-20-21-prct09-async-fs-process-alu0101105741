# Práctica 9 - Sistema de ficheros y creación de procesos en Node.js

## Introducción
En esta práctica llevaremos a cabo una serie de ejercicios que nos ayudarán a familiarizarnos con el [API de callbacks proporcionada por Node.js para interactuar con el sistema de ficheros](https://nodejs.org/dist/latest/docs/api/fs.html#fs_callback_api) y [el API asíncrona proporcionada por Node.js para crear procesos](https://nodejs.org/dist/latest/docs/api/child_process.html#child_process_asynchronous_process_creation).

Para ello tendremos que diseñar una solucón para 4 ejercicios los cuales de encuentran definidos en el [guión de la práctuca](https://ull-esit-inf-dsi-2021.github.io/prct09-async-fs-process/).

## Objetivos
Como hemos mencionado anterior mente esta práctica tiene como objetivo familiarizarnos con el API de callbacks proporcionada por Node.js para interactuar con el sistema de ficheros y el API asíncrona proporcionada por Node.js para crear procesos.

## Realización de la práctica
Para realizar esta práctica diseñaremos las respuestas a los 4 ejercicios propuestos en ficheros con extensión .ts, también debemos generar la documentación de dicho código como hemos hecho en las prácticas anteriores de la asignatura por lo que no entraremos en detalle sobre como realizarlo.

### Ejercicio 1
En este ejercicio se nos plantea un código fuente:
```typescript
import {access, constants, watch} from 'fs';

if (process.argv.length !== 3) {
  console.log('Please, specify a file');
} else {
  const filename = process.argv[2];

  access(filename, constants.F_OK, (err) => {
    if (err) {
      console.log(`File ${filename} does not exist`);
    } else {
      console.log(`Starting to watch file ${filename}`);

      const watcher = watch(process.argv[2]);

      watcher.on('change', () => {
        console.log(`File ${filename} has been modified somehow`);
      });

      console.log(`File ${filename} is no longer watched`);
    }
  });
}
```
Y nos piden realizar una traza mostrando como se modifica el contenido de la pila de llamadas, el registro de eventos de la API y la cola de manejadores de Node.js, además de lo que se muestra por la consola. Además se nos preguntan dos cuestiones las cuales son:
1. ¿Qué hace la función access?
2. ¿Para qué sirve el objeto constants?

La traza debidamente realizada y la respuesta a las cuestiones se encuentran dentro del [fichero markdown](https://github.com/ULL-ESIT-INF-DSI-2021/ull-esit-inf-dsi-20-21-prct09-async-fs-process-alu0101105741/blob/main/src/ejercicio-1/ejercicio-1.md) de la carpeta del ejercicio-1 en el directorio src.

### Ejercicio 2
En este ejercicio se nos pide realizar una aplicación que muestre la información sobre el número de líneas, palabras o caracteres que contiene un fichero de texto. Para ello deberemos hacer que el programa se ejecute desde la línea de comandos utilizando yargs para así poder pasarle como parámetros la ruta del fichero e indicarle al programa desde la línea de comandos si desea visualizar el número de líneas, palabras, caracteres o combinaciones de ellas. También tendremos que realizar el ejercicio de dos maneras diferentes:
1. Haciendo uso del método pipe de un Stream.
2. Sin hacer uso del método pipe.

También le indicaremos por la línea de comandos cual de los dos métodos queremos utilizar.

Como solución de este ejercicio no ha quedado este código:
```typescript
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as yargs from 'yargs';
import {spawn} from 'child_process';

yargs.command({
  command: '*',
  describe: 'Gives information about a file (number of lines, words and/or characters)',
  builder: {
    path: {
      describe: 'Path of the file',
      demandOption: true,
      type: 'string',
    },
    arguments: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    pipe: {
      describe: 'Note title',
      demandOption: true,
      type: 'boolean',
    },
  },
  handler(argv) {
    if (typeof argv.path === 'string' && typeof argv.arguments === 'string' && typeof argv.pipe === 'boolean') {
      const values: string[] = argv.arguments.split(',');
      let characters: boolean = false;
      let words: boolean = false;
      let lines: boolean = false;

      values.forEach((argument) => {
        switch (argument) {
          case 'lineas': {
            lines = true;
            break;
          }
          case 'palabras': {
            words = true;
            break;
          }
          case 'caracteres': {
            characters = true;
          }
        }
      });

      if (argv.pipe == false) {
        noPipe(argv.path, characters, words, lines);
      } else {
        pipe(argv.path, characters, words, lines);
      }
    } else {
      console.log(chalk.red('Arguments types invalid! (--path: string, --arguments: string,string,string, --pipe: boolean'));
    }
  },
});

/**
 * Parse function that allow the
 * program works correctly from
 * the command line
 */
yargs.parse();

/**
 * Function that implements the use of the pipe function
 * @param {string} path path of the file we want to get info
 * @param {boolean} characters True if we want to know the number of characters flase if we dont want
 * @param {boolean} words True if we want to know the number of words flase if we dont want
 * @param {boolean} lines True if we want to know the number of lines flase if we dont want
 */
export function pipe(path: string, characters: boolean, words: boolean, lines: boolean): void {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('myfile does not exist');
        return;
      }
    } else {
      const wc = spawn('wc', [path]);
      let wcOut: string = '';

      wc.stdout.on('data', (data) => (wcOut = wcOut + data));

      wc.on('close', () => {
        const parameters: string[] = wcOut.split(/\s+/);

        if (characters) {
          spawn('echo', [`Caracteres: ${parameters[3]}`]).stdout.pipe(process.stdout);
        }
        if (words) {
          spawn('echo', [`Palabras: ${parameters[2]}`]).stdout.pipe(process.stdout);
        }
        if (lines) {
          spawn('echo', [`Lineas: ${parseInt(parameters[1]) + 1}`]).stdout.pipe(process.stdout);
        }
      });
    }
  });
}

/**
 * Function that dont implement the use of the pipe function
 * @param {string} path path of the file we want to get info
 * @param {boolean} characters True if we want to know the number of characters flase if we dont want
 * @param {boolean} words True if we want to know the number of characters flase if we dont want
 * @param {boolean} lines True if we want to know the number of characters flase if we dont want
 */
export function noPipe(path: string, characters: boolean, words: boolean, lines: boolean): void {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('myfile does not exist');
        return;
      }
    } else {
      const wc = spawn('wc', [path]);
      let wcOut: string = '';

      wc.stdout.on('data', (data) => (wcOut = wcOut + data));

      wc.on('close', () => {
        const parameters: string[] = wcOut.split(/\s+/);
        let consoleOut: string = '';

        if (characters) {
          consoleOut = consoleOut + `Caracteres: ${parameters[3]}\n`;
        }
        if (words) {
          consoleOut = consoleOut + `Palabras: ${parameters[2]}\n`;
        }
        if (lines) {
          consoleOut = consoleOut + `Lineas: ${parseInt(parameters[1]) + 1}\n`;
        }
        console.log(consoleOut);
      });
    }
  });
}

```

Podemos ver como lo primero que hacemos es procesar los argumentos de la línea de comandos para sabes que parámetro quiere el usuario comprobar, para ello utilizaremos flasg que nos indiquen qué parametros son lo que quiere el usuario, luego miramos si el usuario quiere hacer uso del método pipe o no y depende del caso ejecutaremos la función correpondiente. Por último, podemos ver como las dos opciones se asemejan bastante, en las dos comprobamos que el fichero exista y si existe ejecutaremos el comando wc sobre dicho fichero para obtener los datos necesarios. Con los datos obtenidos solo tendremos que separalos y mirar los flags para saber con cuáles debemos quedarnos. Hecho esto ahora es cuando vemos la clara diferencia entre los dos métodos, mientras el método que usa pipe solamente ejecuta un 'echo' con los datos que queremos mostrar redirigiendo la salida de dicho comando a la salida del proceso, el método que no lo usa debe guardar los datos en un string para luego poder mostrarlo gracias a un console.log().

### Ejercicio 3 y ejercicio 4
Debido a diversos problemas, estos ejercicios no han sido resueltos debido a falta de tiempo.

## Conclusiones
Esta práctica ha sido entretenida y me ha ayudado a comprender mejor el uso de callbacks y llamadas asíncronas, pero, lamentablemente por diversos problemas esta semana no he tenido el tiempo suficiente para dedicarle el tiempo necesario a esta práctica, por ello solo he podido realizar los 2 primero ejercicios de la práctica. Aún así creo que he aprendido bastante y esto me ha ayudado a comprender algunas cosas mejor. Por todo esto, ha sido una buena práctica en la que el mayor problema que he sufrido es la falta de tiempo para poder dedicarle a la práctica.
