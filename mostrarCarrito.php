<?php
$cliente = $_COOKIE['nombreCliente'];
$con = new mysqli("localhost", "root", "", "OnlyPCs");
$consulta = "SELECT * FROM Carrito WHERE nombre_Usuario = '$cliente'";
$result = $con->query($consulta);
$precioTotal = 0;

if ($result->num_rows > 0) {
    // Obtener los nombres de los campos
    $productos = $result->fetch_all();
    $lista = array();
    for ($i = 0; $i < count($productos); $i++) {
        $cantidad = $productos[$i][2];
        $consulta = "SELECT * FROM Productos WHERE id = " . $productos[$i][1];
        $result = $con->query($consulta);
        if ($result->num_rows > 0) {
            $producto = $result->fetch_all();
            $precioTotal += $producto[0][2] * $cantidad;
            $lista[] = array($producto[0][0], $producto[0][1], $cantidad, number_format(($producto[0][2] * $cantidad), 2, '.', ''));

        } else {
            echo "No se encontraron registros en la base de datos.";

        }
    }
    setcookie('precioTotal', number_format($precioTotal, 2, '.', ''));
    echo json_encode($lista);
} else {
    echo json_encode("No se han añadido productos");
}

$con->close();
?>