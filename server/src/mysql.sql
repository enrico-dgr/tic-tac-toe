-- SHOW TABLES;

create table Games (
  id int NOT NULL AUTO_INCREMENT,     
  moves int NOT NULL,
  name varchar(255),
  size int DEFAULT 3,
  difficulty int DEFAULT 1,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  lastModified timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (ID)
);

create table Players (
  gameId int NOT NULL,
  userId int NOT NULL, 
  CONSTRAINT PK_Player PRIMARY KEY (gameId, userId)
);

create table Moves (     
  num int NOT NULL,
  gameId int NOT NULL, 
  userId int NOT NULL, 
  CONSTRAINT PK_Move PRIMARY KEY (num, gameId),
  FOREIGN KEY (gameId) References Games(id),
  FOREIGN KEY (userId) References Users(id)
);

alter table Games ADD created_at timestamp DEFAULT CURRENT_TIMESTAMP;
alter table Games ADD lastModified timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
alter table Games ADD CHECK (size>=3 AND size<=7);
alter table Games ADD CHECK (difficulty>=0 AND difficulty<=5);

SELECT  *
FROM    Moves
WHERE   (num, gameId) = (1, 10)