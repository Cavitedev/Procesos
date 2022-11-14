function ClienteWS() {
  var codigo;
  this.socket = io();

  //Enviar Peticiones
  this.crearPartida = function (nick) {
    this.socket.emit("crearPartida", nick);
  };

  this.unirAPartida = function (nick, codigo) {
    this.socket.emit("unirAPartida", nick, codigo);
  };

  this.salirPartida = function (nick, codigo) {
    this.socket.emit("salirPartida", nick, codigo);
    iu.mostrarHome();
  };

  //colocarBarco
  //barcosDesplegados
  //disparar

  //Gestionar Peticiones
  this.servidorWS = function () {
    let cli = this;

    this.socket.on("partidaCreada", function (data) {
      console.log(data);
      if (data.partida == -1) {
        console.log(`No se pudo crear un juego`);
        return;
      }
      cli.codigo = data["partida"];
      console.log(`El usuario ha creado la partida ${cli.codigo}`);
      cli.ultimaPartidaCreada = cli.codigo;
      iu.mostrarListaDePartidas();
      iu.mostrarPartidaUnido(cli.codigo);
    });

    this.socket.on("unidoAPartida", function (datos) {
      let codigo = datos.codigoPartida;
      cli.codigo = codigo;
      let nick = datos.nick;
      if (!datos.seHaUnido) {
        console.log(`${nick} No se pudo unir al juego ${codigo}`);
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${nick} se ha unido a la partida ${codigo}`);
      iu.mostrarListaDePartidas();
      iu.mostrarPartidaUnido(codigo);
      $.cookie("nick", nick);
      $.cookie("codigoP", codigo);
    });

    this.socket.on("aJugar", function (datos) {
      console.log("ha iniciado una partida en la que estaba unido");
      iu.mostrarPartidaUnido(datos["codigo"]);
    });

    this.socket.on("actualizarListaPartidas", function (lista) {
      if (!cli.codigo) {
        console.log("Actualizar lista partidas");
        iu.mostrarListaDePartidas();
      }
    });
  };
}
