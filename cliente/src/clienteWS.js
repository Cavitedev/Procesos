function ClienteWS() {
  this.socket = io();

  //Enviar Peticiones
  this.crearPartida = function (nick) {
    this.socket.emit("crearPartida", nick);
  };

  this.unirAPartida = function (nick, codigo) {
    this.socket.emit("unirAPartida", nick, codigo);
  };

  //Gestionar Peticiones
  this.servidorWS = function () {
    let cli = this;

    this.socket.on("partidaCreada", function (data) {
      console.log(data);
      if (data.partida == -1) {
        console.log(`No se pudo crear un juego`);
        return;
      }
      console.log(`El usuario ha creado la partida ${data.partida}`);
      cli.ultimaPartidaCreada = data.partida;
      iu.mostrarListaDePartidas();
      iu.mostrarCodigo(data.partida);
    });

    this.socket.on("unidoAPartida", function (datos) {
      let codigo = datos.codigoPartida;
      let nick = datos.nick;
      if (!datos.seHaUnido) {
        console.log(`${nick} No se pudo unir al juego ${codigo}`);
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${nick} se ha unido a la partida ${codigo}`);
      iu.mostrarListaDePartidas();
      iu.mostrarCodigo(codigo);
      $.cookie("nick", nick);
      $.cookie("codigoP", codigo);
    });

    this.socket.on("aJugar", function (datos) {
      console.log("ha iniciado una partida en la que estaba unido");
    });
  };
}
