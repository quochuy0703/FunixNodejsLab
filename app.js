const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  let page = `<html>
    <head><title>My first page</title></head>
    <body><h1>Hello from my Node.js Server!</h1></body>
    </html>`;
  res.write(page);
  res.end();
});
server.listen(3000);
