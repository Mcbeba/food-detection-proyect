const inquirer = require('inquirer');
const { spawn } = require('child_process');
const { readDB } = require("./helpers/saveFile");


let serverProcess;

//Iniciar el servidor
function startServer() {

  if (serverProcess !== undefined) {
    console.log('The server process for capture data is already running on process number', serverProcess.pid)
    return
  }

  serverProcess = spawn('node', ['index.js']);

  serverProcess.stdout.on('data', (data) => {
    console.log(`\n\n Server: ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`Error server: ${data}`);
    stopServer();
  });

  serverProcess.on('error', (error) => {
    console.log(`Error: ${error.message}`);
    process.exit(0)
  });

  serverProcess.on('exit', (code, signal) => {
    if (code) console.log(`Process exit with code ${code}`);
    stopServer();
    console.log(`Done`)
  });
}

//Parar servidor
function stopServer() {
  if (serverProcess) {
    const res = serverProcess.kill();
    //process.exit()
    console.log('Server process ended');
  } else {
    console.log('No server process running');
  }
}

//Abrir el historial
function openHistoryBD() {
  console.log('Open database history...');
  readDB()
}

//Mostrar cabecera
async function cabecera() {
  console.log('============================================');
  console.log('   Welcome to my Food Detection Project     ');
  console.log('============================================\n');
}
cabecera()

//Mostrar el menú
function showMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'opcion',
        message: 'Select an option:\n',
        choices: ['Start server for Food Detector', 'Open last search history', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.opcion) {
        case 'Start server for Food Detector':
          console.clear();
          startServer();
          showMenu();
          break;
        case 'Open last search history':
          console.clear();
          openHistoryBD();
          showMenu();
          break;
        case 'Exit':
          console.clear();
          console.log('exiting ...');
          stopServer();
          process.exit(0);
        default:
          console.log('Invalid option.');
      }
    });
}

showMenu();


