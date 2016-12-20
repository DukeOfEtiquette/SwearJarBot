DROP TABLE `words_uttered`;
DROP TABLE `naughty_words`;

CREATE TABLE `naughty_words` (
	`id` INT AUTO_INCREMENT,
	`word` VARCHAR(20) NOT NULL UNIQUE,
	`cost` FLOAT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `words_uttered` (
	`id` INT AUTO_INCREMENT,
	`member_name` VARCHAR(255) NOT NULL,
	`word_id` INT NOT NULL,
	`occurrences` INT NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `words_uttered` ADD CONSTRAINT `words_uttered_fk0` FOREIGN KEY (`word_id`) REFERENCES `naughty_words`(`id`);

INSERT INTO naughty_words (word, cost) VALUES ("tit", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("ass", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("fuck", 0.25);
INSERT INTO naughty_words (word, cost) VALUES ("bitch", 0.15);
INSERT INTO naughty_words (word, cost) VALUES ("retard", 0.2);
INSERT INTO naughty_words (word, cost) VALUES ("cunt", 0.01);
INSERT INTO naughty_words (word, cost) VALUES ("dick", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("bastard", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("shit", 0.15);
INSERT INTO naughty_words (word, cost) VALUES ("chode", -0.25);
INSERT INTO naughty_words (word, cost) VALUES ("cock", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("cumtart", -1.00);
INSERT INTO naughty_words (word, cost) VALUES ("cum", 0.01);
INSERT INTO naughty_words (word, cost) VALUES ("dookie", 0.05);
INSERT INTO naughty_words (word, cost) VALUES ("douche", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("dyke", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("fag", 0.3);
INSERT INTO naughty_words (word, cost) VALUES ("fudgepacker", 0.3);
INSERT INTO naughty_words (word, cost) VALUES ("gay", 1.50);
INSERT INTO naughty_words (word, cost) VALUES ("damn", 0.01);
INSERT INTO naughty_words (word, cost) VALUES ("guido", -0.05);
INSERT INTO naughty_words (word, cost) VALUES ("homo", 0.99);
INSERT INTO naughty_words (word, cost) VALUES ("hoe", 0.15);
INSERT INTO naughty_words (word, cost) VALUES ("jagoff", 0.35);
INSERT INTO naughty_words (word, cost) VALUES ("fucka", 0.27);
INSERT INTO naughty_words (word, cost) VALUES ("nigger", 1.00);
INSERT INTO naughty_words (word, cost) VALUES ("nigga", 1.50);
INSERT INTO naughty_words (word, cost) VALUES ("penis", -1.00);
INSERT INTO naughty_words (word, cost) VALUES ("poon", 0.75);
INSERT INTO naughty_words (word, cost) VALUES ("prick", 0.80);
INSERT INTO naughty_words (word, cost) VALUES ("pussy", 0.60);
INSERT INTO naughty_words (word, cost) VALUES ("queef", -0.55);
INSERT INTO naughty_words (word, cost) VALUES ("skank", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("smegma", -0.99);
INSERT INTO naughty_words (word, cost) VALUES ("snatch", 0.25);
INSERT INTO naughty_words (word, cost) VALUES ("slut", 0.15);
INSERT INTO naughty_words (word, cost) VALUES ("sloot", 0.1);
INSERT INTO naughty_words (word, cost) VALUES ("tard", 0.30);
INSERT INTO naughty_words (word, cost) VALUES ("twat", 0.40);
INSERT INTO naughty_words (word, cost) VALUES ("vagina", -0.78);
INSERT INTO naughty_words (word, cost) VALUES ("vajayjay", 0.25);
INSERT INTO naughty_words (word, cost) VALUES ("vajj", 0.25);
INSERT INTO naughty_words (word, cost) VALUES ("whore", 0.45);



/*INSERT INTO naughty_words (word, cost) VALUES ("", 0.1);*/







