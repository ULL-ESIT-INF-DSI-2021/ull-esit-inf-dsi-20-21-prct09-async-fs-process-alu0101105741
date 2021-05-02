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
          default: {
            console.log(chalk.red('ERROR: Arguments must be "lineas, palabras or caracteres" divided by a ","'));
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
 * asd
 * @param {string} path asd
 * @param {boolean} characters asd
 * @param {boolean} words asd
 * @param {boolean} lines sad
 */
export function pipe(path: string, characters: boolean, words: boolean, lines: boolean): void {
  fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('myfile does not exist');
        return;
      }
    } else {
      if (characters) {
        const echo = spawn('echo', ['Caracteres: ']);
        echo.stdout.pipe(process.stdout);
        const wc = spawn('wc', ['-m', path]);
        wc.stdout.pipe(process.stdout);
      }
      if (words) {
        const echo = spawn('echo', ['Palabras: ']);
        echo.stdout.pipe(process.stdout);
        const wc = spawn('wc', ['-w', path]);
        wc.stdout.pipe(process.stdout);
      }
      if (lines) {
        const echo = spawn('echo', ['Lineas: ']);
        echo.stdout.pipe(process.stdout);
        const wc = spawn('wc', ['-l', path]);
        wc.stdout.pipe(process.stdout);
      }
    }
  });
}

/**
 * asd
 * @param {string} path asd
 * @param {boolean} characters asd
 * @param {boolean} words asd
 * @param {boolean} lines asd
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
          consoleOut = consoleOut + `Palabras: ${parameters[3]}\n`;
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
