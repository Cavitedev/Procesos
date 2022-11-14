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
          socket.join(codigoPartida.toString());
        }
        cli.enviarAlRemitente(socket, "partidaCreada", {
          partida: codigoPartida,
        });
        let lista = juego.obtenerPartidasDisponibles();
        cli.enviarATodos(socket, "actualizarListaPartidas", lista);
      });

      socket.on("unirAPartida", function (nick, codigo) {
        let partida = juego.obtenerPartida(codigo);
        if (!partida) {
          console.log("Partida null en unir partida");
          return;
        }

        let seHaUnido = juego.unirAPartidaNick(codigo, nick);
        if (seHaUnido) {
          socket.join(codigo.toString());
        }
        cli.enviarAlRemitente(socket, "unidoAPartida", {
          nick: nick,
          codigoPartida: codigo,
          seHaUnido: seHaUnido,
        });

        if (partida.esDesplegando()) {
          cli.enviarATodosEnPartida(io, codigo.toString(), "aDesplegar", {
            codigo: codigo,
          });
        }
      });

      socket.on("salirPartida", function (nick, codigo) {
        juego.finalizarJuego(nick, codigo);
        socket.leave(codigo);
        cli.enviarAlRemitente(socket, "partidaEliminada", {});
      });

      socket.on(
        "colocarBarco",
        function (nick, codigo, barco, x, y, orientacion) {
          let partida = juego.obtenerPartida(codigo);
          if (!partida) {
            console.log(`No se encontró la partida ${codigo}`);
            return;
          }
          let jugador = partida.obtenerJugador(nick);
          let haSidoColocado = jugador.colocarBarco(barco, x, y, orientacion);

          cli.enviarAlRemitente(socket, "barcoColocado", {
            haSidoColocado: haSidoColocado,
          });
          // Añadir barco
        }
      );

      socket.on("barcosDesplegados", function (nick, codigo) {
        let partida = juego.obtenerPartida(codigo);
        let jugador = partida.obtenerJugador(nick);
        let haSidoDesplegado = jugador.barcosDesplegados();

        cli.enviarAlRemitente(socket, "barcoDesplegadosCallback", {
          haSidoDesplegado: haSidoDesplegado,
        });

        if (partida.esJugando()) {
          cli.enviarATodosEnPartida(io, codigo.toString(), "aJugar", {
            codigo: codigo,
          });
        }
      });
    });
  };
}

module.exports.ServidorWS = ServidorWS;
