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
    var cadena =
      "<div class = 'row' id='mH'>" +
      "<div class='col'>" +
      "<h2>Bienvenido " +
      rest.nick +
      "</h2>" +
      "<div id='codigo'" +
      "</div>" +
      "</div>";
    $("#mH").html(cadena);
    // this.mostrarCrearPartida();
  };

  this.mostrarCrearPartida = function () {
    //Dibujar un botón que al hacer click llame a crear partida
    $("mCP").remove();
    var cadena =
      "<div class='row' id='mCP'>" +
      "<div class='col'>" +
      "<button id='btnAP' class='btn btn-primary mb-2 mr-sm-2'>Crear Partida</button>" +
      "</div>" +
      "</div>";
    $("#crearPartida").html(cadena);

    $("#btnAP").on("click", function (e) {
      // $("#mCP").remove();
      rest.crearPartida(rest.nick);
    });
  };

  this.mostrarCodigo = function (codigo) {
    $("#cP").remove();
    var cadena =
      "<div id='cP'><p> Código de la partida: " + codigo + "</p></div>";
    $("#codigo").append(cadena);
  };

  this.mostrarListaDePartidas = function () {
    $("#mLP").remove();
    var cadena =
      "<div class='row' id='mLP'><ul class='list-group' id='LP'></ul></div>";
    $("#listaPartidas").append(cadena);

    rest.obtenerPartidasDisponibles();
  };

  this.mostrarListaDePartidasCallback = function (partidas) {
    for (partida of partidas) {
      var cadena =
        "<li class='list-group-item'><span>" +
        "Código: " +
        partida.codigo +
        "</span>  " +
        "<span>" +
        "Propietario:" +
        partida.owner +
        "</span>" +
        "<button id='btnUP' data-value='" +
        partida.codigo +
        "'" +
        " class='btn btn-primary mb-2 mr-sm-2'>Unir Partida</button>" +
        "</li>";
      $("#LP").append(cadena);

      $("#btnUP").on("click", function (e) {
        var codigo = $(this).data("value");
        rest.unirAPartida(codigo, rest.nick);
      });
    }
  };
}
