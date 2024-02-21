llamarAJAX("");

var busqueda = document.querySelector(".buscar");
busqueda.addEventListener("input", function () {
  llamarAJAX(document.querySelector(".buscar").value);
});

function registrar() {
  var texto =
    document.getElementById("nombre").value +
    "-" +
    document.getElementById("password").value;
  console.log(texto);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      if (this.response == "Correcto") {
        window.location.href = "index.html";
      } else {
        let h3 = document.createElement("h3");
        h3.style.color = "red";
        h3.textContent = "El usuario o la contraseña es erronea";
        document.querySelector(".body").appendChild(h3);
      }
    }
  };

  xhttp.open("POST", "inicioSesion.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("texto=" + texto);
}

function llamarAJAX(input) {
  //Recogida de datos en un array
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      mostrarProductos(this.responseText);
    }
  };
  xhttp.open("POST", "recogida.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(input);
}

function mostrarProductos(productos) {
  var body = document.querySelector(".productos");
  productos = JSON.parse(productos);
  body.innerHTML = "";
  for (var i = 0; i < productos.length; i++) {
    var producto = document.createElement("div");
    var nombre = document.createElement("h3");
    nombre.innerHTML = productos[i][1];
    var precio = document.createElement("p");
    precio.innerHTML = productos[i][2];
    producto.className = "producto";
    producto.id = nombre.textContent;
    var button = document.createElement("button");
    button.textContent = "Añadir al carrito";
    button.addEventListener("click", addCarrito(nombre.textContent));
    producto.appendChild(nombre);
    producto.appendChild(precio);
    producto.appendChild(button);
    body.appendChild(producto);
  }
}

function addCarrito(nombreProducto) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      mostrarProductos(this.responseText);
    }
  };
  xhttp.open("POST", "recogida.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(input);
}
