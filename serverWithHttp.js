// fileName : server.js
// Example using the http module
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>hello server</h1>");
  res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Node.js HTTP server is running on port ${PORT}`);
});
