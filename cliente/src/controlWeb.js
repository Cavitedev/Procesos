function ControlWeb() {
  this.mostrarAgregarUsuario = function () {
    var cadena = '<div id="mAU"><h2>Inicio de Sesión</h2><div class="row" >'; //'<form class="form-row needs-validation"  id="mAU">';
    cadena = cadena + '<div class="col"><h2>El juego indefinido</h2></div>';
    cadena = cadena + '<div class="row">';
    cadena = cadena + '<div class="row">';
    cadena =
      cadena +
      '<input type="text" class="form-control mb-2 mr-sm-2" id="usr" placeholder="Introduce tu nick (max 6 letras)" required></div>';
    cadena = cadena + '<div class="col">';
    cadena =
      cadena +
      '<button id="btnAU" class="btn btn-primary mb-2 mr-sm-2">Iniciar sesión</button>';
    //cadena=cadena+'<a href="/auth/google" class="btn btn-primary mb-2 mr-sm-2">Accede con Google</a>';
    cadena = cadena + "</div></div>"; //' </form>';
    cadena = cadena + '<div id="nota"></div></div>';

    $("#agregarUsuario").append(cadena);
    //$("#nota").append("<div id='aviso' style='text-align:right'>Inicia sesión con Google para jugar</div>");

    $("#btnAU").on("click", function (e) {
      if ($("#usr").val() === "" || $("#usr").val().length > 6) {
        e.preventDefault();
        $("#nota").text("Nick inválido");
      } else {
        var nick = $("#usr").val();
        $("#mAU").remove();
        $("#aviso").remove();
        rest.agregarUsuario(nick);
      }
    });
  };

  this.mostrarHome = function () {
    $("#mH").remove();
    var cadena = `
    <h2>Bienvenido ${rest.nick}</h2>
    <div><p>Home</p></div>
    `;
    $("#mH").append(cadena);
    // this.mostrarCrearPartida();
  };

  this.mostrarCrearPartida = function () {
    //Dibujar un botón que al hacer click llame a crear partida

    $("#contenido").remove();
    var cadena = `<button id="btnAP" class="btn btn-primary mb-2 mr-sm-2">Crear Partida</button>`;
    $("#contenido").append(cadena);

    $("#btnAP").on("click", function (e) {
      rest.crearPartida(rest.nick);
    });
  };

  this.mostrarListaDePartidas = function () {
    //Crear lista html
  };
}
