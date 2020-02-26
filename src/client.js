const net = require('net');

const client = net.createConnection({
  host: '127.0.0.1',
  port: 3005
});

client.on('connect', () => {
  client.write('Hello');
  client.write('I am client.');
  client.write(
    Array(65538)
      .fill('A')
      .join('')
  );
});

client.on('data', (buffer) => {
  console.log('[Server] ' + buffer.toString());
});

client.on('error', (err) => {
  console.error('Error: ', err);
});

client.on('close', () => {
  console.log('Client Close!');
});
