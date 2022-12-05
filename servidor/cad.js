const { MongoClient, ObjectId, Collection } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB;

function Cad() {
  MongoClient.connect(uri, { useUnifiedTopology: true }).then((client, err) => {
    const cad = this;
    if (err) {
      console.log(err);
      client.close();
      return;
    }

    const dbName = "procesos-si";

    cad.partidas = client.db(dbName).collection("partidas");
    if (!cad.partidas) {
      console.log("No se pudo acceder a la coleccion");
      client.close();
      return;
    }
  });

  this.insertarPartida = function (partida, callback) {
    insertar(this.partidas, partida, callback);
  };

  function insertar(coleccion, elemento, callback) {
    coleccion.insertOne(elemento).then((elemento, err) => {
      if (err) {
        console.log("error");
      } else {
        console.log("Nuevo elemento creado");
        callback(elemento);
      }
    });
  }
}

module.exports.Cad = Cad;
