const fs = require("fs");

const requestHandler = (req, res) => {
  let url = req.url;
  let method = req.method;
  if (url === "/") {
    let page = `<html>
      <head><title>My first page</title></head>
      <body><form action="/message" method="POST"><input type="text" name="message"><button type="submit" >Send</button></form></body>
      </html>`;
    res.write(page);
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];

      fs.writeFileSync("message.txt", message);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  let page = `<html>
      <head><title>My first page</title></head>
      <body><h1>Hello from my Node.js Server!</h1></body>
      </html>`;
  res.write(page);
  res.end();
};

module.exports = requestHandler;

module.exports.handler = requestHandler;
module.exports.someText = "Some hard coded text";
