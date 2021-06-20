USE Auth;

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  permission varchar(100) NOT NULL,
  username varchar(100) NOT NULL,
  pass varchar(100) NOT NULL,
  token VARCHAR (256) ,
  CONSTRAINT idk PRIMARY KEY (id),
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (permission, username, pass) VALUES ('admin', 'admin', 'admin');
INSERT INTO users (permission, username, pass) VALUES ('moderator', 'moderator', 'moderator');
INSERT INTO users (permission, username, pass) VALUES ('user', 'user', 'user');
