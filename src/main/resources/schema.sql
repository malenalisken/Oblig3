CREATE TABLE Billett (
    id INTEGER AUTO_INCREMENT NOT NULL,
    film VARCHAR(255) NOT NULL,
    antall INTEGER NOT NULL,
    fornavn VARCHAR(255) NOT NULL,
    etternavn VARCHAR(255) NOT NULL,
    telefonnr VARCHAR(8) NOT NULL,
    epost VARCHAR(255) NOT NULL,
    primary key (id)
);

CREATE TABLE Film(
    id INTEGER AUTO_INCREMENT NOT NULL,
    navn VARCHAR(255),
    primary key (id,navn)
);

INSERT INTO Film (navn)
VALUES ('Shawshank Redemption'),
       ('Fight Club'),
       ('American Psycho'),
       ('Avatar'),
       ('Dead Poets Society'),
       ('Good Will Hunting'),
       ('Totoro');