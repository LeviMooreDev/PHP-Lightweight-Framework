DROP TABLE IF EXISTS `authentication`;

CREATE TABLE `authentication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_bin;