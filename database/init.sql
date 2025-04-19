-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 21, 2025 at 04:16 PM
-- Server version: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(64) NOT NULL,
  `role` enum('User','Admin') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('236789f7-ff6f-11ef-85e2-0242ac110002', 'tamir', 'dwek', 'mimiv@gmail.com', 'tamir123', 'Admin', '2025-03-12 18:23:02', '2025-03-12 18:23:02'),
('23679603-ff6f-11ef-85e2-0242ac110002', 'hagit', 'israeli', 'hagi@gmail.com', 'hagit123', 'User', '2025-03-12 18:23:02', '2025-03-12 18:23:02'),
('4328ead9-ff6f-11ef-85e2-0242ac110002', 'shlomo', 'six', 'atal@gmail.com', 'six123', 'User', '2025-03-12 18:23:49', '2025-03-12 18:23:49'),
('4328f04b-ff6f-11ef-85e2-0242ac110002', 'tamir', 'tamir', 'hassgi@gmail.com', 'tamir123', 'User', '2025-03-12 18:23:49', '2025-03-12 18:23:49'),
('627c5043-ff6f-11ef-85e2-0242ac110002', 'david', 'meleh', 'meleh@gmail.com', 'meleh', 'User', '2025-03-12 18:24:42', '2025-03-12 18:24:42'),
('627c545a-ff6f-11ef-85e2-0242ac110002', 'jin', 'tonik', 'jin@gmail.com', 'jin123', 'User', '2025-03-12 18:24:42', '2025-03-12 18:24:42'),
('7a14e713-a980-43ad-b016-a79dab7c8c15', 'Joffssdhn', 'Dffofdde', 'ddaffofe@exdample.com', '$2b$10$8M8HI4N70eUwrneJ15RgG.ZjAT9z2dmJB1gQU2yevNLBwcMGHFGcy', 'User', '2025-03-19 10:42:52', '2025-03-19 10:42:52'),
('823f1443-ff6f-11ef-85e2-0242ac110002', 'yuval', 'kormierski', 'yoba@gmail.com', 'yuv999', 'User', '2025-03-12 18:25:34', '2025-03-12 18:25:34'),
('823f1cd1-ff6f-11ef-85e2-0242ac110002', 'melon', 'twist', 'twist@walla.co.il', 'twist123', 'User', '2025-03-12 18:25:34', '2025-03-12 18:25:34'),
('96bcd2bf-ff6f-11ef-85e2-0242ac110002', 'yaki', 'dwek', 'yaki@gmail.com', 'yakii22', 'User', '2025-03-12 18:26:27', '2025-03-12 18:26:27'),
('96bcd959-ff6f-11ef-85e2-0242ac110002', 'mia', 'dwek', 'mia33@gmail.com', 'mia33', 'User', '2025-03-12 18:26:27', '2025-03-12 18:26:27'),
('a7ba7634-03b8-4157-a8f9-2ba679b28d3b', 'Josshn', 'Dodde', 'ddaoe@example.com', '$2b$10$9XxLKlC/SerA7la0Li9wc.MClGJPAlxlv4hs12a4LQwiQj3W/nsnK', 'User', '2025-03-13 13:39:34', '2025-03-13 13:39:34'),
('ae0623f7-ff6f-11ef-85e2-0242ac110002', 'tom ', 'aviv', 'tom@gmail.com', 'tam2222', 'User', '2025-03-12 18:27:02', '2025-03-12 18:27:02'),
('ae062d75-ff6f-11ef-85e2-0242ac110002', 'ben', 'narkis', 'narkis@gmail.com', 'narkis2222', 'User', '2025-03-12 18:27:02', '2025-03-12 18:27:02'),
('b4fdabeb-b795-43a4-85fe-e2a7b41ca736', 'John', 'Doe', 'john.doe@example.com', '$2b$10$nptejbyaB6emWZ0BG2B0IeEiBgBOiQuSRBRDAroZRZ4/nkcHo4/Ve', 'User', '2025-03-13 12:52:54', '2025-03-13 12:52:54'),
('c3eb926b-ff6f-11ef-85e2-0242ac110002', 'ilan', 'moshe', 'ilan224@gmail.com', 'ilan222', 'User', '2025-03-12 18:27:54', '2025-03-12 18:27:54'),
('e3dff040-ff6f-11ef-85e2-0242ac110002', 'neri ', 'lich', 'neri@gmail.com', 'neri123', 'User', '2025-03-12 18:28:18', '2025-03-12 18:28:18'),
('e3dff760-ff6f-11ef-85e2-0242ac110002', 'obi', 'haim', 'haim555@gmail.com', 'haim55', 'User', '2025-03-12 18:28:18', '2025-03-12 18:28:18'),
('ff45943a-d93a-417a-826c-34beebf3dae4', 'Jossdhn', 'Dofdde', 'ddaofe@exdample.com', '$2b$10$GoyR5s3FfyScAKpzf7nuAOVm.boZ0APrWwEyPefOlfsssXj4./2hC', 'User', '2025-03-18 18:58:35', '2025-03-18 18:58:35');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` float NOT NULL,
  `image_file` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `end_date`, `price`, `image_file`, `created_at`, `updated_at`) VALUES
('2e220016-066f-11f0-8c88-0242ac110002', 'Italy', 'Italy offers a perfect blend of history, culture, and breathtaking landscapes. From Rome’s ancient ruins to Venice’s romantic canals and Tuscany’s rolling vineyards, every region has its charm. Savor world-famous Italian cuisine, explore stunning coastlines, and experience the warm Mediterranean spirit. A trip to Italy is a journey of beauty, flavor, and history!', '2025-04-01 18:10:09', '2025-03-11 18:10:09', 500, 'https://assets.vogue.com/photos/65f04d926294babad5413eb1/16:9/w_5760,h_3240,c_limit/GettyImages-1380534040.jpg', '2025-03-21 16:10:09', '2025-03-21 16:10:09'),
('2e220a7b-066f-11f0-8c88-0242ac110002', 'Barcelona', 'Barcelona is a city of stunning architecture, lively culture, and beautiful beaches. Explore Gaudí’s masterpieces like the Sagrada Familia, stroll down La Rambla, and enjoy delicious tapas. With its sunny weather, rich history, and exciting nightlife, Barcelona is the perfect destination for an unforgettable vacation!', '2025-05-01 18:10:09', '2025-03-31 18:10:09', 1500, 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4d/45/49/province-of-barcelona.jpg?w=1200&h=700&s=1', '2025-03-21 16:10:09', '2025-03-21 16:10:09'),
('749e89bb-066f-11f0-8c88-0242ac110002', 'Madrid', 'Madrid, Spain’s vibrant capital, blends rich history with a modern, lively atmosphere. Explore the Royal Palace, stroll through Retiro Park, and visit world-class museums like the Prado. Savor authentic tapas, experience passionate flamenco, and enjoy the city’s energetic nightlife. Madrid is the perfect destination for culture, food, and excitement!', '2025-03-21 16:11:45', '2025-03-31 18:11:45', 500, 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/348000/348698-Madrid.jpg', '2025-03-21 16:11:45', '2025-03-21 16:11:45'),
('749e902f-066f-11f0-8c88-0242ac110002', 'Paris', 'Paris is a dream destination with its iconic Eiffel Tower, world-class museums like the Louvre, and charming cafés. Enjoy exquisite French cuisine and stroll along the romantic Seine River.', '2025-04-27 18:11:45', '2025-05-06 18:11:45', 550, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/640px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg', '2025-03-21 16:11:45', '2025-03-21 16:11:45'),
('a2b593d5-066f-11f0-8c88-0242ac110002', 'Tokyo', 'Tokyo blends ancient temples with futuristic skyscrapers. Explore vibrant districts like Shibuya, enjoy fresh sushi, and experience the unique culture of Japan’s capital.', '2025-05-01 18:13:43', '2025-05-24 18:13:43', 1500, 'https://images.squarespace-cdn.com/content/v1/5b228bd689c172172ab88d9c/1501f7d6-87ac-445c-a87b-e9ff9551ccaa/_DSF5280-Enhanced-NR.jpg', '2025-03-21 16:13:43', '2025-03-21 16:13:43'),
('a2b597ae-066f-11f0-8c88-0242ac110002', 'Sydney', 'Sydney offers stunning beaches, the famous Opera House, and a laid-back coastal vibe. Take a ferry to Manly Beach or explore the scenic Blue Mountains nearby.\r\n\r\n', '2025-03-31 18:13:43', '2025-04-30 18:13:43', 2500, 'https://vmove.com.au/wp-content/uploads/2024/08/facts-about-sydney.jpg', '2025-03-21 16:13:43', '2025-03-21 16:13:43'),
('be645d99-066f-11f0-8c88-0242ac110002', 'Rio de Janeiro', 'Rio de Janeiro – A Tropical Paradise!\r\nWith its golden beaches, Christ the Redeemer statue, and the world-famous Carnival, Rio is full of energy, culture, and breathtaking views.', '2025-09-01 18:15:00', '2025-10-31 18:15:00', 1600, 'https://lp-cms-production.imgix.net/2023-02/500pxRF_68764197.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75', '2025-03-21 16:15:00', '2025-03-21 16:15:00'),
('de116b3c-066f-11f0-8c88-0242ac110002', 'Amsterdam’s', 'Amsterdam’s picturesque canals, world-renowned museums, and vibrant nightlife make it a must-visit destination. Rent a bike and explore the city like a local!', '2025-03-23 18:15:46', '2025-03-31 18:15:46', 690, 'https://www.holland.com/upload_mm/2/4/4/80160_fullimage_rondvaartboot%20vaart%20onder%20brug%20door%20met%20mooie%20wolkenlucht%20%C2%A9%20illusion-x%20via%20pixabay_1150x663_438x353.jpg', '2025-03-21 16:15:46', '2025-03-21 16:15:46'),
('f4dedcac-066e-11f0-8c88-0242ac110002', 'Athens ', 'Athens, the heart of Greece, blends rich history, vibrant nightlife, and stunning views. Explore iconic sites like the Acropolis and Parthenon, enjoy traditional tavernas, and visit lively markets. With beautiful beaches nearby and a warm Mediterranean vibe, Athens is the ideal getaway for culture, food, and relaxation!', '2025-06-01 13:54:04', '2025-06-07 13:54:04', 1000, 'https://www.visitgreece.gr/images/1743x752/jpg/files/s_1852670350_athens_1743x752.jpg', '2025-03-21 11:54:03', '2025-03-21 11:54:03'),
('f4deeb6c-066e-11f0-8c88-0242ac110002', 'Rome', 'Rome, the Eternal City, is a perfect mix of ancient history, stunning architecture, and delicious Italian cuisine. Wander through iconic landmarks like the Colosseum and Vatican City, explore charming piazzas, and indulge in authentic pasta and gelato. With its rich culture and romantic atmosphere, Rome is an unforgettable vacation spot!', '2025-04-01 13:54:04', '2025-04-09 13:54:04', 400, 'https://cdn.audleytravel.com/1050/750/79/1018521-rome-skyline-italy.webp', '2025-03-21 11:54:03', '2025-03-21 11:54:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `followers_vacationId_userId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
