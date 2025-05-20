const express = require('express');
const cors = require('cors');
const routes = require('./routes/index.js');

const server = express();

server.name = "api";

server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // aca dejo en * para que puedan acceder todos
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/api", routes);

server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;