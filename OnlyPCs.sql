-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 26, 2024 at 09:48 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `OnlyPCs`
--

-- --------------------------------------------------------

--
-- Table structure for table `Carrito`
--

CREATE TABLE `Carrito` (
  `nombre_Usuario` varchar(50) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Carrito`
--

INSERT INTO `Carrito` (`nombre_Usuario`, `id_Producto`, `cantidad`) VALUES
('cliente1', 2, 2),
('cliente1', 5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Pedidos`
--

CREATE TABLE `Pedidos` (
  `id` int(11) NOT NULL,
  `nombre_Usuario` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `precio_Total` float(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Pedidos:Productos`
--

CREATE TABLE `Pedidos:Productos` (
  `id_Pedido` int(11) NOT NULL,
  `id_Producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Productos`
--

CREATE TABLE `Productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `precio_Unidad` float(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Productos`
--

INSERT INTO `Productos` (`id`, `nombre`, `precio_Unidad`) VALUES
(1, 'Memoria Ram', 80.95),
(2, 'CPU', 50.00),
(3, 'Placa Base', 70.30),
(4, 'Targeta Grafica', 112.94),
(5, 'Refrigeracion liquida', 160.00);

-- --------------------------------------------------------

--
-- Table structure for table `Usuarios`
--

CREATE TABLE `Usuarios` (
  `nombre_Usuario` varchar(50) NOT NULL,
  `clave` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Usuarios`
--

INSERT INTO `Usuarios` (`nombre_Usuario`, `clave`) VALUES
('cliente1', 'cliente1'),
('root', '123456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Carrito`
--
ALTER TABLE `Carrito`
  ADD PRIMARY KEY (`nombre_Usuario`,`id_Producto`);

--
-- Indexes for table `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nombre_Usuario` (`nombre_Usuario`);

--
-- Indexes for table `Pedidos:Productos`
--
ALTER TABLE `Pedidos:Productos`
  ADD PRIMARY KEY (`id_Pedido`,`id_Producto`);

--
-- Indexes for table `Productos`
--
ALTER TABLE `Productos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Usuarios`
--
ALTER TABLE `Usuarios`
  ADD PRIMARY KEY (`nombre_Usuario`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Pedidos`
--
ALTER TABLE `Pedidos`
  ADD CONSTRAINT `Pedidos_ibfk_1` FOREIGN KEY (`nombre_Usuario`) REFERENCES `Usuarios` (`nombre_Usuario`);

--
-- Constraints for table `Pedidos:Productos`
--
ALTER TABLE `Pedidos:Productos`
  ADD CONSTRAINT `Pedidos:Productos_ibfk_1` FOREIGN KEY (`id_Pedido`) REFERENCES `Pedidos` (`id`),
  ADD CONSTRAINT `Pedidos:Productos_ibfk_2` FOREIGN KEY (`id_Producto`) REFERENCES `Productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
