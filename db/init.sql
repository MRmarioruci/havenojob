-- Create a new user
CREATE USER 'user'@'%' IDENTIFIED BY 'smilemalaka0343';

-- Grant privileges to the user
GRANT ALL PRIVILEGES ON havenojob.* TO 'user'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
--
-- Database: `havenojob`
--
CREATE DATABASE IF NOT EXISTS `havenojob` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `havenojob`;

-- --------------------------------------------------------

--
-- Table structure for table `Emails`
--

CREATE TABLE `Emails` (
  `id` int UNSIGNED NOT NULL,
  `email` varchar(250) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `creationDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Emails`
--
ALTER TABLE `Emails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Emails`
--
ALTER TABLE `Emails`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;