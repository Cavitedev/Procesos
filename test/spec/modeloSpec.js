describe("El juego", function () {
  var juego;
  var usr1, usr2, usr3;

  beforeEach(function () {
    juego = new Juego();
    usr1 = juego.agregarUsuario("pepe");
    usr2 = juego.agregarUsuario("luis");
    usr3 = juego.agregarUsuario("pepa");
  });

  describe("inicialmente", function () {
    it("No hay partidas", function () {
      console.log(juego);
      expect(juego.obtenerPartidas().length).toEqual(0);
    });
  });

  it("Crear juego y se une uno, el juego tiene 2 jugadores", function () {
    const partidaId = usr1.crearPartida();
    usr2.unirseAPartida(partidaId);

    const partida = juego.partidas[partidaId];

    expect(partida.owner).toEqual(usr1.nick);
    expect(partida.jugadores).toEqual([usr1.nick, usr2.nick]);
  });

  it("Crear juego y se unen otros dos, devuelve false al unirse el último y no se une", function () {
    const partidaId = usr1.crearPartida();
    const resultadoUnirseUsr2 = usr2.unirseAPartida(partidaId);
    const resultadoUnirseUsr3 = usr3.unirseAPartida(partidaId);

    const partida = juego.partidas[partidaId];

    expect(resultadoUnirseUsr2).toEqual(true);
    expect(resultadoUnirseUsr3).toEqual(false);
    expect(partida.owner).toEqual(usr1.nick);
    expect(partida.jugadores).toEqual([usr1.nick, usr2.nick]);
  });

  it("Usuario intenta unirse a una partida no existente, devuelve false", function () {
    const idPartidaInexistente = 1;
    const resultadoUnirseUsr1 = usr1.unirseAPartida(idPartidaInexistente);
    expect(resultadoUnirseUsr1).toEqual(false);
  });

  it("Partida deja de estar disponible al llenarse", function () {
    const partidaId = usr1.crearPartida();
    let partida = juego.partidas[partidaId];

    expect(partida.estaDisponible()).toEqual(true);

    usr2.unirseAPartida(partidaId);

    expect(partida.estaDisponible()).toEqual(false);
  });
});
