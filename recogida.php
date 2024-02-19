<?php
$input = file_get_contents('php://input');
$con = new mysqli("localhost", "root", "", "OnlyPCs");
$consulta = "SELECT * FROM Productos WHERE nombre LIKE '%$input%'";
$result = $con->query($consulta);

if ($result->num_rows > 0) {
    // Obtener los nombres de los campos
    echo json_encode($result->fetch_all());
} else {
    echo "No se encontraron registros en la base de datos.";
}

$con->close();
?>