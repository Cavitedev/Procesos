function ServidorWS() {
  //enviar peticiones

  this.enviarAlRemitente = function (socket, mensaje, datos) {
    socket.emit(mensaje, datos);
  };

  this.enviarATodosEnPartida = function (io, codigo, mensaje, datos) {
    io.sockets.in(codigo).emit(mensaje, datos);
  };

  //gestionar peticiones
  this.lanzarServidorWS = function (io, juego) {
    let cli = this;
    io.on("connection", (socket) => {
      console.log("Usuario conectado");

      socket.on("crearPartida", function (nick) {
        let codigoPartida = juego.crearPartidaNick(nick);
        if (codigoPartida) {
          socket.join(res.codigo);
        }
        cli.enviarAlRemitente(socket, "partidaCreada", codigoPartida);
      });

      socket.on("unirAPartida", function (nick, codigo) {
        let seHaUnido = juego.unirAPartidaNick(codigo, nick);
        if (seHaUnido) {
          socket.join(res.codigo);
        }
        cli.enviarAlRemitente(socket, "unidoAPartida", {
          nick: nick,
          codigoPartida: codigo,
          seHaUnido: seHaUnido,
        });

        if (partida.fase.esJugando()) {
          this.enviarATodosEnPartida(io, codigo, "aJugar", {});
        }
      });
    });
  };
}

module.exports.ServidorWS = ServidorWS;
