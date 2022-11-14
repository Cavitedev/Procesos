function ServidorWS() {
  //enviar peticiones

  this.enviarAlRemitente = function (socket, mensaje, datos) {
    socket.emit(mensaje, datos);
  };

  this.enviarATodosEnPartida = function (io, codigo, mensaje, datos) {
    io.sockets.in(codigo).emit(mensaje, datos);
  };

  this.enviarATodos = function (socket, mensaje, datos) {
    socket.broadcast.emit(mensaje, datos);
  };

  //gestionar peticiones
  this.lanzarServidorWS = function (io, juego) {
    let cli = this;
    io.on("connection", (socket) => {
      console.log("Usuario conectado");

      socket.on("crearPartida", function (nick) {
        let codigoPartida = juego.crearPartidaNick(nick);
        if (codigoPartida) {
          socket.join(codigoPartida);
        }
        cli.enviarAlRemitente(socket, "partidaCreada", {
          partida: codigoPartida,
        });
        let lista = juego.obtenerPartidasDisponibles();
        cli.enviarATodos(socket, "actualizarListaPartidas", lista);
      });

      socket.on("unirAPartida", function (nick, codigo) {
        let seHaUnido = juego.unirAPartidaNick(codigo, nick);
        if (seHaUnido) {
          socket.join(codigo);
        }
        cli.enviarAlRemitente(socket, "unidoAPartida", {
          nick: nick,
          codigoPartida: codigo,
          seHaUnido: seHaUnido,
        });

        let partida = juego.obtenerPartida(codigo);
        if (partida.esDesplegando()) {
          cli.enviarATodosEnPartida(io, codigo, "aJugar", { codigo: codigo });
        }
      });

      socket.on("salirPartida", function (nick, codigo) {
        juego.finalizarJuego(nick, codigo);
        socket.leave(codigo);
        cli.enviarAlRemitente(socket, "partidaEliminada", {});
      });
    });
  };
}

module.exports.ServidorWS = ServidorWS;
