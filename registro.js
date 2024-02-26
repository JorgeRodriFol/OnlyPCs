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
          document.cookie="nombreCliente="+document.getElementById("nombre").value;
          window.location.href = "index.php";
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