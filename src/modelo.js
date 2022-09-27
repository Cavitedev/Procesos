function Juego() {
  this.partidas = {};
  this.usuarios = {};

  this.agregarUsuario = function (nick) {
    if (this.usuarios[nick]) {
      console.log(`El usuario ${nick} ya existe`);
    }
    this.usuarios[nick] = new Usuario(nick, this);
    return this.usuarios[nick];
  };
  this.eliminarUsuario = function (nick) {
    delete this.usuarios[nick];
  };

  this.crearPartida = function (nick) {
    //Obtener uid
    //Crear partida
    //Asignar propietario a nick
    //Devolver partida
    let codigo = Date.now();
    this.partidas[codigo] = new Partida(codigo, nick);
    return codigo;
  };

  this.unirAPartida = function (codigo, nick) {
    const partida = this.partidas[codigo];
    if (!partida) {
      console.log("La partida no existe");
      return false;
    }
    return partida.agregarJugador(nick);
  };

  this.obtenerPartidas = function () {
    let lista = [];
    for (let key in this.partidas) {
      lista.push({
        codigo: key,
        owner: this.partidas[key].owner,
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
        filterLista.push(partida);
      }
    }
    return filterLista;
  };
}

function Usuario(nick, juego) {
  this.nick = nick;
  this.juego = juego;

  this.crearPartida = function () {
    return this.juego.crearPartida(this.nick);
  };

  this.unirseAPartida = function (codigo) {
    return this.juego.unirAPartida(codigo, nick);
  };
}

function Partida(codigo, nick) {
  this.codigo;
  this.owner = nick;
  this.jugadores = [nick];
  const maxJugadores = 2;
  this.agregarJugador = function (nick) {
    if (this.jugadores.length >= maxJugadores) {
      console.log("Partida llena");
      return false;
    }
    this.jugadores.push(nick);
    return true;
  };

  this.estaDisponible = function () {
    return this.jugadores.length < maxJugadores;
  };
}
