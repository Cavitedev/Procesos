const express = require("express");
const fs = require("fs");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const passport = require("passport");

const modelo = require("./servidor/modelo.js");
const sWS = require("./servidor/servidorWS.js");
const passportSetup = require("./servidor/passportSetup.js");

const PORT = process.env.PORT || 3000;

let juego = new modelo.Juego(process.argv[2] === "true");
passportSetup.iniciarAuth();
let servidorWS = new sWS.ServidorWS();
const cookieSession = require("cookie-session");
/*
"/"
"/obtenerPartidas"
"/agregarUsuario/:nick"
...
*/

app.use(express.static(__dirname + "/"));

app.use(
  cookieSession({
    name: "Batalla naval",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  const contenido = fs.readFileSync(__dirname + "/cliente/src/index.html");
  res.setHeader;
  "Content-type", "text/html";
  res.send(`${contenido}`);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/failure" }),
  function (req, res) {
    console.log("Authenticate");
    const nick = req.user;
    if (nick) {
      juego.agregarUsuario(nick);
    }
  
    res.cookie("nick", nick);
    res.redirect("/success");
  }
);

app.get("/success", (req, res) => {
  console.log("Exito");
  res.redirect("/");
});

app.get("/failure", (req, res) => {
  console.log("Fallo");
  res.redirect("/");
});

app.get("/leerUsuario/:nick", (req, res) => {
  let nick = req.params.nick;
  let usuario = juego.usuarios[nick];
  let output = { nick: usuario ? usuario.nick : -1 };
  res.send(output);
});

app.get("/agregarUsuario/:nick", (req, res) => {
  let nick = req.params.nick;
  let nuevoUsuario = juego.agregarUsuario(nick);
  let output = { nick: nuevoUsuario ? nuevoUsuario.nick : -1 };
  res.send(output);
});

app.get("/crearPartida/:nick", (req, res) => {
  let nick = req.params.nick;
  let codigoPartida = juego.crearPartidaNick(nick);
  res.send({ partida: codigoPartida });
});

app.get("/unirAPartida/:codigo/:nick", (req, res) => {
  let codigo = req.params.codigo;
  let nick = req.params.nick;
  let codigoPartida = juego.unirAPartidaNick(codigo, nick);
  res.send({ seHaUnido: codigoPartida });
});

app.get("/obtenerPartidas", (req, res) => {
  let partidas = juego.obtenerPartidas();
  res.send(partidas);
});

app.get("/obtenerPartidasDisponibles", (req, res) => {
  let partidas = juego.obtenerPartidasDisponibles();
  res.send(partidas);
});

server.listen(PORT, () => {
  console.log(`Express 👂 puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
  console.log("Presiona Ctrl+C para salir.");
});

servidorWS.lanzarServidorWS(io, juego);
