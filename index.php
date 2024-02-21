<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <title>Tienda Online</title>
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <div class="parent">
    <div class="menuTop">
      <div class="search-container">
        <input class="buscar" type="text" placeholder="Buscar..." />
        <button type="submit">Buscar</button>
      </div>
      <a class="carrito" href="./carrito.php"><img src="carrito-de-compras.png" alt="carrito" /></a>
      <div class="log_in">
        <a href="./login.php">
          <h3>LOG IN</h3>
        </a>
      </div>
    </div>
    <div class="body">
      <div class="inventario">
        <h1>PRODUCTOS</h1>
        <div class="productos"></div>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>

</html>