<?php
$cliente = $_COOKIE['nombreCliente'];
$producto = $_POST['producto'];
$con = new mysqli("localhost", "root", "", "OnlyPCs");
$consulta = "SELECT * FROM Carrito WHERE nombre_Usuario = '$cliente' and id_Producto = $producto";
$result = $con->query($consulta);
if ($result->num_rows > 0) {
    $productos = $result->fetch_all();
    if (!is_int($_POST['cantidad'])) {
        $delete = "DELETE FROM Carrito WHERE nombre_Usuario = '$cliente' AND id_Producto = $producto";
        print_r($delete);
        $result = $con->query($delete);
        if ($result) {
            echo "Producto eliminado";
        } else {
            echo "Error al borrar";
        }
    } else {
        $nuevaCantidad = $productos[0][2] - $_POST['cantidad'];
        echo $nuevaCantidad;
        if ($nuevaCantidad < 1) {
            $delete = "DELETE FROM Carrito WHERE nombre_Usuario = '$cliente' AND id_Producto = $producto";
            print_r($delete);
            $result = $con->query($delete);
            if ($result) {
                echo "Producto eliminado";
            } else {
                echo "Error al borrar";
            }
        } else {
            $update = "UPDATE Carrito SET cantidad = " . $nuevaCantidad . " WHERE id_Producto = '" . $producto . "' and nombre_Usuario = '$cliente'";
            $result = $con->query($update);
            print_r($update);
            if ($result) {
                echo "Cantidad actualizada";
            } else {
                echo "Error al actualizar";
            }
        }
    }
} else {

}
?>