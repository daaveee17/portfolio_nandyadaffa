const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

function requestHandler(req, res) {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  reqUrl = decodeURIComponent(reqUrl);
  const filePath = path.join(__dirname, reqUrl);

  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

function checkPort(port, callback) {
  const tester = net.createServer()
    .once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        checkPort(port + 1, callback);
      } else {
        callback(err);
      }
    })
    .once('listening', () => {
      tester.close(() => {
        callback(null, port);
      });
    })
    .listen(port);
}

const initialPort = parseInt(process.env.PORT, 10) || 3000;
checkPort(initialPort, (err, availablePort) => {
  if (err) {
    console.error('Failed to find open port:', err);
    process.exit(1);
  }
  const server = http.createServer(requestHandler);
  server.listen(availablePort, () => {
    console.log(`Portfolio server is running at http://localhost:${availablePort}`);
  });
});
