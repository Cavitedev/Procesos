function ServidorWS() {
  //Enviar Peticiones

  //Gestionar Peticiones

  const lanzarServidorWS = function (io, juego) {
    io.on("connection", (socket) => {
      console.log("Usuario conectado");
    });
  };
}

module.exports.ServidorWS = ServidorWS;
