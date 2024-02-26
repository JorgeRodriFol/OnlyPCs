<?php
$producto = $_POST['producto'];
$cliente = $_COOKIE['nombreCliente'];
$con = new mysqli("localhost", "root", "", "OnlyPCs");
$consulta = "SELECT * FROM Productos WHERE id = '$producto'";
echo $consulta;
$result = $con->query($consulta);
if ($result->num_rows > 0) {
    $arryaProductos = $result->fetch_assoc();
    // Obtener los nombres de los campos
    $consulta = "SELECT * FROM Carrito WHERE id_Producto = '" . $arryaProductos['id'] . "' && nombre_Usuario = '$cliente'";
    $result = $con->query($consulta);
    if ($result->num_rows > 0) {
        $productoCarrito = $result->fetch_assoc();
        print_r($productoCarrito['cantidad']);
        $update = "UPDATE Carrito SET cantidad = " . ++$productoCarrito['cantidad'] . " WHERE id_Producto = '" . $arryaProductos['id'] . "' && nombre_Usuario = '$cliente'";
        $result = $con->query($update);
        if ($result) {
            echo "Cantidad actualizada";
        } else {
            echo "Error al actualizar";
        }
    } else {
        $insercion = "INSERT INTO Carrito VALUES('$cliente', ".$arryaProductos['id'].", 1)";
        echo $insercion;
        $result = $con->query($insercion);
        if ($result) {
            echo "Nuevo producto añadido";
        } else {
            echo "Error al añadir";
        }
    }
} else {
    echo "No se encontraron registros en la base de datos.";
}

$con->close();
?>