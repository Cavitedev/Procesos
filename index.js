"use strict";
const express = require("express");
const app = express();

/*
"/"
"/obtenerPartidas"
"/agregarUsuario/:nick"
...
*/

app.get("/", (req, res) => {
  res.status(200).send(`Hello`).end();
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
