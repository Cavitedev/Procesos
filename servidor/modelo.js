function Juego() {
  this.partidas = {};
  this.usuarios = {};

  this.agregarUsuario = function (nick) {
    if (this.usuarios[nick]) {
      console.log(`El usuario ${nick} ya existe`);
      return null;
    }
    this.usuarios[nick] = new Usuario(nick, this);
    console.log(`Nuevo usuario en el sistema: ${nick}`);
    return this.usuarios[nick];
  };
  this.eliminarUsuario = function (nick) {
    this.finalizarJuegosDe(nick);

    let existiaUsuario = this.usuarios[nick] != null;
    let eliminacionExitosa = delete this.usuarios[nick];
    let haSidoEliminado = eliminacionExitosa && existiaUsuario;
    console.log(
      haSidoEliminado
        ? `Eliminado al usuario ${nick}`
        : `no se pudo eliminar a ${nick}`
    );
    return haSidoEliminado;
  };

  this.finalizarJuegosDe = function (nick) {
    for (let codigoPartida in this.partidas) {
      let partida = this.partidas[codigoPartida];
      if (partida.esOwnerDe(nick)) {
        partida.fase = "final";
        console.log(
          `La partida ${partida.codigo} pasa a finalizada porque el propietario ${nick} dejó el juego`
        );
      } else if (partida.esJugadoPor(nick)) {
        if (partida.fase == "inicial") {
          partida.eliminarJugador(nick);
          console.log(
            `El jugador "${nick}" abandona la partida ${partida.codigo}`
          );
        }
      }
    }
  };

  this.crearPartidaUsuario = function (usuario) {
    //Obtener uid
    //Crear partida
    //Asignar propietario a nick
    //Devolver partida
    let codigo = Date.now();
    this.partidas[codigo] = new Partida(codigo, usuario);
    return codigo;
  };

  this.crearPartidaNick = function (nick) {
    let usuario = this.usuarios[nick];
    if (!usuario) {
      return -1;
    }

    let codigoPartida = usuario.crearPartida();
    return codigoPartida;
  };

  this.obtenerPartida = function (codigo) {
    return this.partidas[codigo];
  };

  this.unirAPartida = function (codigo, usuario) {
    const partida = this.partidas[codigo];
    if (!partida) {
      console.log("La partida no existe");
      return false;
    }
    return partida.agregarJugador(usuario);
  };

  this.unirAPartidaNick = function (codigo, nick) {
    let usuario = this.usuarios[nick];
    if (!usuario) {
      return false;
    }

    let codigoPartida = usuario.unirseAPartida(codigo);
    return codigoPartida;
  };

  this.obtenerPartidas = function () {
    let lista = [];
    for (let key in this.partidas) {
      lista.push({
        codigo: key,
        owner: this.partidas[key].owner.nick,
        fase: this.partidas[key].fase,
      });
    }
    return lista;
  };

  this.obtenerPartidasDisponibles = function () {
    let filterLista = [];
    let lista = this.obtenerPartidas();
    for (let i = 0; i < lista.length; i++) {
      let partidaJson = lista[i];
      let partida = this.partidas[partidaJson.codigo];
      if (partida.estaDisponible()) {
        filterLista.push(partidaJson);
      }
    }
    return filterLista;
  };
}

function Usuario(nick, juego) {
  this.nick = nick;
  this.juego = juego;

  this.crearPartida = function () {
    return this.juego.crearPartidaUsuario(this);
  };

  this.unirseAPartida = function (codigo) {
    return this.juego.unirAPartida(codigo, this);
  };
}

function Partida(codigo, usuario) {
  this.codigo;
  this.fase = "inicial";
  this.owner = usuario;
  this.jugadores = [usuario];
  const maxJugadores = 2;
  this.agregarJugador = function (usuario) {
    if (!this.hayHueco()) {
      console.log("Partida llena");
      return false;
    }
    this.jugadores.push(usuario);
    console.log(
      `El usuario ${usuario.nick} se ha unido a la partida ${codigo}`
    );

    this.comprobarFase();
    return true;
  };

  this.eliminarJugador = function (nick) {
    let idx = this.jugadores.findIndex((p) => p.nick == nick);
    if (idx != -1) {
      this.jugadores.splice(idx, 1);
    }
  };

  this.estaDisponible = function () {
    return this.jugadores.length < maxJugadores;
  };

  this.comprobarFase = function () {
    if (!this.hayHueco()) {
      this.fase = "jugando";
    }
  };

  this.esJugando = function () {
    return this.fase == "jugando";
  };

  this.esOwnerDe = function (nick) {
    return this.owner.nick == nick;
  };

  this.esJugadoPor = function (nick) {
    return this.jugadores.some((j) => j.nick == nick);
  };

  this.hayHueco = () => this.jugadores.length < maxJugadores;
}

module.exports.Juego = Juego;
