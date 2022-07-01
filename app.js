const http = require("http");
const server = http.createServer((req, res) => {
  let url = req.url;
  if (url === "/") {
    let page = `<html>
    <head><title>My first page</title></head>
    <body><form action="/message" method="POST"><input type="text"><button type="submit" name="message">Send</button></form></body>
    </html>`;
    res.write(page);
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  let page = `<html>
    <head><title>My first page</title></head>
    <body><h1>Hello from my Node.js Server!</h1></body>
    </html>`;
  res.write(page);
  res.end();
});
server.listen(3000);
