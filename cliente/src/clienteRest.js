function ClienteRest() {
  this.agregarUsuario = function async(nick) {
    var cli = this;
    $.getJSON("/agregarUsuario/" + nick, function (data) {
      console.log(data);
      if (data.nick == -1) {
        console.log(`El usuario ${data.nick} ya está en uso`);
        //iu.mostrarModal("El nick ya está en uso");
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${data.nick} se ha registrado`);
      //   ws.nick = data.nick;
      //$.cookie("nick",ws.nick);
      //iu.mostrarHome(data);
    });
  };

  this.eliminarUsuario = function (nick) {
    var cli = this;
    $.getJSON("/eliminarUsuario/" + nick, function (data) {
      console.log(data);
      if (!data.eliminado) {
        console.log(`El usuario ${data.nick} no existía o no se pudo eliminar`);
        //iu.mostrarModal("El nick ya está en uso");
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${data.nick} se ha eliminado`);
      //   ws.nick = data.nick;
      //$.cookie("nick",ws.nick);
      //iu.mostrarHome(data);
    });
  };

  this.crearPartida = function (nick) {
    var cli = this;
    $.getJSON("/crearPartida/" + nick, function (data) {
      console.log(data);
      if (data.partida == -1) {
        console.log(`No se pudo crear un juego`);
        //iu.mostrarModal("El nick ya está en uso");
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${nick} ha creado la partida ${data.partida}`);
      //$.cookie("nick",ws.nick);
      //iu.mostrarHome(data);
    });
  };

  this.unirAPartida = function (codigo, nick) {
    var cli = this;
    $.getJSON(`/unirAPartida/${codigo}/${nick}`, function (data) {
      console.log(data);
      if (!data.seHaUnido) {
        console.log(`No se pudo unir al juego`);
        //iu.mostrarModal("El nick ya está en uso");
        //iu.mostrarAgregarJugador();
        return;
      }
      console.log(`El usuario ${nick} se ha unido a la partida ${codigo}`);
      //$.cookie("nick",ws.nick);
      //iu.mostrarHome(data);
    });
  };

  this.obtenerPartidas = function () {
    var cli = this;
    $.getJSON("/obtenerPartidas", function (data) {
      console.log(data);
    });
  };

  this.obtenerPartidasDisponibles = function () {
    var cli = this;
    $.getJSON("/obtenerPartidasDisponibles", function (data) {
      console.log(data);
    });
  };
}
