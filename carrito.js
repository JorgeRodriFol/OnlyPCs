if (document.cookie === null || document.cookie === "") {
  alert("Debes registrarte");
  window.location.href = "index.php";
} else {
  llamarAJAX();
}
function llamarAJAX() {
  //Recogida de datos en un array
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      mostrarProductos(this.responseText);
    }
  };
  xhttp.open("POST", "mostrarCarrito.php", true);
  xhttp.send();
}

function mostrarProductos(productos) {
  var body = document.querySelector(".productos");
  productos = JSON.parse(productos);
  body.innerHTML = "";
  if (typeof productos === "string") {
    var texto = document.createElement("h3");
    texto.textContent = productos;
    texto.style.color = "red";
    body.appendChild(texto);
  } else {
    for (var i = 0; i < productos.length; i++) {
      let id = productos[i][0];
      var producto = document.createElement("div");
      var nombre = document.createElement("h3");
      nombre.innerHTML = productos[i][1];
      var cantidad = document.createElement("p");
      cantidad.innerHTML = productos[i][2] + " unidades";
      var precio = document.createElement("p");
      precio.innerHTML = productos[i][3] + "€";
      producto.className = "producto";
      producto.id = nombre.textContent;
      var inputNumber = document.createElement("input");
      inputNumber.type = "number";
      inputNumber.id = productos[i][0];
      var eliminarCantidad = document.createElement("button");
      eliminarCantidad.textContent = "Borrar cantidad";
      eliminarCantidad.addEventListener("click", function () {
        let cantidad = document.getElementById(id).value;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            llamarAJAX();
          }
        };

        xhttp.open("POST", "borrarCarrito.php", true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhttp.send("producto=" + id + "&cantidad=" + cantidad);
      });
      var eliminarTodo = document.createElement("button");
      eliminarTodo.textContent = "Quitar del carrito";
      eliminarTodo.addEventListener("click", function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            llamarAJAX();
          }
        };

        xhttp.open("POST", "borrarCarrito.php", true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhttp.send("producto=" + id + "&cantidad=All");
      });
      producto.appendChild(nombre);
      producto.appendChild(cantidad);
      producto.appendChild(precio);
      producto.appendChild(inputNumber);
      producto.appendChild(eliminarCantidad);
      producto.appendChild(eliminarTodo);
      body.appendChild(producto);
    }
    var comprar = document.createElement("button");
    comprar.textContent = "comprar";
    comprar.addEventListener("click", function () {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.response);
          if (this.response == "Correcto") {
            alert("Compra realizada");
            llamarAJAX();
          }
        }
      };
      xhttp.open("POST", "comprar.php", true);
      xhttp.send();
    });
    body.appendChild(comprar);
  }
}
