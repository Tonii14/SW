const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const externalUrl = process.env.RENDER_EXTERNAL_URL;
const port =
  externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 4080;
const config = {
  baseURL: externalUrl || `https://localhost:${port}`,
};

app.use(express.static(path.join(__dirname)));

app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "\\index.html");
});

app.get("/sound", function (request, response) {
  response.sendFile(__dirname + "\\sound.html");
});

if (externalUrl) {
  const hostname = "127.0.0.1";
  app.listen(port, hostname, () => {
    console.log(`Server locally running at http://${hostname}:${port}/ and from
outside on ${externalUrl}`);
  });
} else {
  https
    .createServer(
      {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
      },
      app
    )
    .listen(port, function () {
      console.log(`Server running at https://localhost:${port}/`);
    });
}
