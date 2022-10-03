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
    existiaUsuario = this.usuarios[nick] != null;
    eliminacionExitosa = delete this.usuarios[nick];
    console.log(
      haSidoEliminado
        ? `Eliminado al usuario ${nick}`
        : `no se pudo eliminar a ${nick}`
    );
    return eliminacionExitosa && existiaUsuario;
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
      return -false;
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
  this.fase;
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
    return true;
  };

  this.estaDisponible = function () {
    return this.jugadores.length < maxJugadores;
  };

  this.comprobarFase = function () {
    if (!this.hayHueco()) {
      this.fase = "jugando";
    }
  };

  this.hayHueco = () => this.jugadores.length < maxJugadores;
}

module.exports.Juego = Juego;
