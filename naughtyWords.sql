CREATE TABLE `naughtyWords` (
  `id` INT AUTO_INCREMENT,
  `word` VARCHAR(255) NOT NULL UNIQUE,
  `cost` FLOAT NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO naughtyWords (word, cost) VALUES ("tit", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("ass", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("fuck", 0.25);
INSERT INTO naughtyWords (word, cost) VALUES ("bitch", 0.15);
INSERT INTO naughtyWords (word, cost) VALUES ("retard", 0.2);
INSERT INTO naughtyWords (word, cost) VALUES ("cunt", 0.01);
INSERT INTO naughtyWords (word, cost) VALUES ("dick", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("bastard", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("shit", 0.15);
INSERT INTO naughtyWords (word, cost) VALUES ("chode", -0.25);
INSERT INTO naughtyWords (word, cost) VALUES ("cock", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("cumtart", -1.00);
INSERT INTO naughtyWords (word, cost) VALUES ("cum", 0.01);
INSERT INTO naughtyWords (word, cost) VALUES ("dookie", 0.05);
INSERT INTO naughtyWords (word, cost) VALUES ("douche", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("dyke", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("fag", 0.3);
INSERT INTO naughtyWords (word, cost) VALUES ("fudgepacker", 0.3);
INSERT INTO naughtyWords (word, cost) VALUES ("gay", 1.50);
INSERT INTO naughtyWords (word, cost) VALUES ("damn", 0.01);
INSERT INTO naughtyWords (word, cost) VALUES ("guido", -0.05);
INSERT INTO naughtyWords (word, cost) VALUES ("homo", 0.99);
INSERT INTO naughtyWords (word, cost) VALUES ("hoe", 0.15);
INSERT INTO naughtyWords (word, cost) VALUES ("jagoff", 0.35);
INSERT INTO naughtyWords (word, cost) VALUES ("fucka", 0.27);
INSERT INTO naughtyWords (word, cost) VALUES ("nigger", 1.00);
INSERT INTO naughtyWords (word, cost) VALUES ("nigga", 1.50);
INSERT INTO naughtyWords (word, cost) VALUES ("penis", 1.00);
INSERT INTO naughtyWords (word, cost) VALUES ("poon", 0.75);
INSERT INTO naughtyWords (word, cost) VALUES ("prick", 0.80);
INSERT INTO naughtyWords (word, cost) VALUES ("pussy", 0.60);
INSERT INTO naughtyWords (word, cost) VALUES ("queef", -0.55);
INSERT INTO naughtyWords (word, cost) VALUES ("skank", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("smegma", -0.99);
INSERT INTO naughtyWords (word, cost) VALUES ("snatch", 0.25);
INSERT INTO naughtyWords (word, cost) VALUES ("slut", 0.15);
INSERT INTO naughtyWords (word, cost) VALUES ("sloot", 0.1);
INSERT INTO naughtyWords (word, cost) VALUES ("tard", 0.30);
INSERT INTO naughtyWords (word, cost) VALUES ("twat", 0.40);
INSERT INTO naughtyWords (word, cost) VALUES ("vagina", -0.78);
INSERT INTO naughtyWords (word, cost) VALUES ("vajayjay", 0.25);
INSERT INTO naughtyWords (word, cost) VALUES ("vajj", 0.25);
INSERT INTO naughtyWords (word, cost) VALUES ("whore", 0.45);



/*INSERT INTO naughtyWords (word, cost) VALUES ("", 0.1);*/







