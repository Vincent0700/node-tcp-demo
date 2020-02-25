const net = require('net');
const HOST = '127.0.0.1';
const PORT = 3000;

const server = net.createServer();
server.listen(PORT, HOST);

server.on('listening', () => {
  console.log(`Server is started at ${HOST}:${PORT}\n`);
});

server.on('connection', (socket) => {
  socket.on('data', (buffer) => {
    const msg = buffer.toString();
    console.log('[Client] ' + msg);
    socket.write(Buffer.from('Received: ' + msg));
  });
});

server.on('close', () => {
  console.log('Server Close!');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn('Port has been occupied.');

    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  } else {
    console.error('Error: ', err);
  }
});
