-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Tempo de geração: 11/03/2026 às 17:47
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `med_connect`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `ambulancia`
--

CREATE TABLE `ambulancia` (
  `id` int(11) NOT NULL,
  `num_ambulancia` varchar(50) DEFAULT NULL,
  `placa_ambu` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ambulancia`
--

INSERT INTO `ambulancia` (`id`, `num_ambulancia`, `placa_ambu`) VALUES
(9, '42455678', '8976AZH');

-- --------------------------------------------------------

--
-- Estrutura para tabela `atendimento`
--

CREATE TABLE `atendimento` (
  `id_atendimento` int(11) NOT NULL,
  `paciente_id` int(11) DEFAULT NULL,
  `data_atendimento` datetime NOT NULL,
  `motivo_consul` varchar(250) DEFAULT NULL,
  `anamnese_inicial` text DEFAULT NULL,
  `status_fila` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `atendimento`
--

INSERT INTO `atendimento` (`id_atendimento`, `paciente_id`, `data_atendimento`, `motivo_consul`, `anamnese_inicial`, `status_fila`) VALUES
(1, 5, '2025-11-14 16:39:19', 'Dor de cabeça', 'Dore de cabeça, febre e nausea', 1),
(2, 4, '2025-11-14 17:45:45', 'Dor no braço', 'O paciente sente dor no braço, o paciente relatou que caiu de cavalo.', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `exames`
--

CREATE TABLE `exames` (
  `id` int(11) NOT NULL,
  `nome_exam` varchar(50) DEFAULT NULL,
  `tipo_exam` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `exames`
--

INSERT INTO `exames` (`id`, `nome_exam`, `tipo_exam`) VALUES
(5, 'Tomografia', 'Imagem'),
(7, 'Exames de sangue', 'Laboratorial');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `nome` varchar(50) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `cpf` char(11) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` char(11) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `id_func` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `funcionarios`
--

INSERT INTO `funcionarios` (`nome`, `usuario`, `cpf`, `senha`, `email`, `telefone`, `cargo`, `id_func`) VALUES
('José das couves', 'José', '12345678900', '12345', 'jose.couves@gmail.com', '42999999999', 'CORD', 4);

-- --------------------------------------------------------

--
-- Estrutura para tabela `medicamentos`
--

CREATE TABLE `medicamentos` (
  `id_medicamento` int(11) NOT NULL,
  `nome_medicamento` varchar(50) NOT NULL,
  `unidade_medida` varchar(50) NOT NULL,
  `dosagem_padrao` varchar(50) NOT NULL,
  `num_anvisa` varchar(50) NOT NULL,
  `validade_medicamento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `medicamentos`
--

INSERT INTO `medicamentos` (`id_medicamento`, `nome_medicamento`, `unidade_medida`, `dosagem_padrao`, `num_anvisa`, `validade_medicamento`) VALUES
(4, 'paracetamol', 'gramas (g)', '100', '456467787', '2007-02-01'),
(6, 'ibupronefo', 'mililitros (mL)', '120', '456467787', '2007-02-01'),
(7, 'Insulina', 'mililitros (mL)', '30', '5577877', '2026-02-01');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pacientes`
--

CREATE TABLE `pacientes` (
  `id_paciente` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` char(11) NOT NULL,
  `telefone` char(11) DEFAULT NULL,
  `data_nasc` date NOT NULL,
  `idade` int(11) NOT NULL,
  `sexo` char(1) NOT NULL,
  `email` varchar(50) NOT NULL,
  `logradouro` varchar(100) NOT NULL,
  `numero_ende` int(11) DEFAULT NULL,
  `cep` char(8) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `bairro` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pacientes`
--

INSERT INTO `pacientes` (`id_paciente`, `nome`, `cpf`, `telefone`, `data_nasc`, `idade`, `sexo`, `email`, `logradouro`, `numero_ende`, `cep`, `cidade`, `estado`, `complemento`, `bairro`) VALUES
(4, 'João das couves', '12345678900', '4280000000', '2007-02-10', 18, 'm', 'paciente@gmail.com', 'Rua das flores', 120, '85195000', 'Curitiba', 'PR', 'Casa', 'centro'),
(5, 'Predo rosa', '12345678900', '42999999999', '2007-02-01', 18, 'M', 'jose.couves@gmail.com', 'Rua das flores', 4567, '00000000', 'Curitiba', 'PR', 'Casa', 'centro');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `ambulancia`
--
ALTER TABLE `ambulancia`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `atendimento`
--
ALTER TABLE `atendimento`
  ADD PRIMARY KEY (`id_atendimento`),
  ADD KEY `idx_paciente` (`paciente_id`);

--
-- Índices de tabela `exames`
--
ALTER TABLE `exames`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`id_func`);

--
-- Índices de tabela `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id_medicamento`);

--
-- Índices de tabela `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`id_paciente`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `ambulancia`
--
ALTER TABLE `ambulancia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `atendimento`
--
ALTER TABLE `atendimento`
  MODIFY `id_atendimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `exames`
--
ALTER TABLE `exames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `id_func` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id_medicamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `pacientes`
--
ALTER TABLE `pacientes`
  MODIFY `id_paciente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `atendimento`
--
ALTER TABLE `atendimento`
  ADD CONSTRAINT `atendimento_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id_paciente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
