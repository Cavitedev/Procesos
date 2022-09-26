function Juego() {
  this.partidas = {};
  this.usuarios = {};

  this.agregarUsuario = function (nick) {
    if (!this.usuarios[nick]) {
      this.usuarios[nick] = new Usuario(nick, this);
    }
  };
  this.eliminarUsuario=function(nick){
    delete this.usuarios[nick];
  }

  this.crearPartida = function (nick) {
    //Obtener uid
    //Crear partida
    //Asignar propietario a nick
    //Devolver partida
  };
}

function Usuario(nick, juego) {
  this.nick = nick;
  this.juego = juego;

  this.crearPartida = function (nombre) {
    this.juego.crearPartida(nombre);
  };
}

function Partida(nombre) {
  this.nombre = nombre;
}
