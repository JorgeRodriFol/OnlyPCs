<?php
$cliente = $_COOKIE['nombreCliente'];
$con = new mysqli("localhost", "root", "", "OnlyPCs");
$consulta = "SELECT * FROM Carrito WHERE nombre_Usuario = '$cliente'";

$result = $con->query($consulta);
if ($result->num_rows > 0) {
    $carrito = $result->fetch_all();
    $precioTotal = $_COOKIE['precioTotal'];
    $idPedido = 1;
    $consulta = "SELECT * FROM Pedidos ORDER BY id DESC";
    $result = $con->query($consulta);
    if ($result->num_rows > 0) {
        $pedidos = $result->fetch_all();
        $idPedido = ++$pedidos[0][0];
    }
    $insercion = "INSERT INTO Pedidos VALUES($idPedido, '" . $cliente . "', '" . date('Y-m-d') . "', $precioTotal)";
    $result = $con->query($insercion);
    if ($result) {
        $contador = 0;
        for ($i = 0; $i < sizeof($carrito); ++$i) {
            $insercion = "INSERT INTO `Pedidos:Productos` VALUES($idPedido, " . $carrito[$i][1] . ", " . $carrito[$i][2] . ")";
            $result = $con->query($insercion);
            if ($result) {
                $contador++;
            } else {
                echo "Error al añadir Pedidos:Productos";
            }
        }
        if ($contador == sizeof($carrito)) {
            $delete = "DELETE FROM Carrito WHERE nombre_Usuario = '$cliente'";
            $result = $con->query($delete);
            if ($result) {
                echo "Correcto";
            } else {
                echo "Error al borrar";
            }

        }
    } else {
        echo "Error al añadir";
    }

} else {
    echo "No hay productos en el carrito";
}
?>