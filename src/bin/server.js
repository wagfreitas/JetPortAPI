// Configuração sevidor
/**
 * @author Wagner Alves
 */
'use sctict'

const app = require('../app')
const http = require('http');
const debug = require('debug')('balta:server');

// Instancia de api
const port = nomalizePort(process.env.PORT || '3333'); // Chava a função para validar a porta
app.set('port', port);

globalPort = port;

const server = http.createServer(app);

// Chamando metodos
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log(`API Rodando na porta: ${port} 🏆 `);

/**
 * Normaliando porta de conexão
 * @param {*} val 
 */
function nomalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/**
 * Erro de conexao
 * @param {*} error 
 */
function onError(error) {
    // if (error.syscall !== 'listem') {
    //     console.log(error)
    // }

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requer privilegios elevados!');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' já está em uso!');
            process.exit(1);
            break;

        default:
            throw error;
    }
}

/**
 * Função para ficar escutando a porta
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ', + bind);
}



