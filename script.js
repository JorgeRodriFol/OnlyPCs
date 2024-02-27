llamarAJAX("");

var busqueda = document.querySelector(".buscar");
busqueda.addEventListener("input", function () {
  llamarAJAX(document.querySelector(".buscar").value);
});

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
    button.className = productos[i][0];
    button.addEventListener("click", function () {
      if (document.cookie === null || document.cookie === "") {
        alert("Debes registrarte");
      } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
          }
        };
        xhttp.open("POST", "addCarrito.php", true);
        xhttp.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhttp.send("producto=" + this.className);
      }
    });
    producto.appendChild(nombre);
    producto.appendChild(precio);
    producto.appendChild(button);
    body.appendChild(producto);
  }
}
