CREATE TABLE users (
  id SERIAL ,
  name VARCHAR NOT NULL ,
  password VARCHAR NOT NULL,
  email VARCHAR,
  PRIMARY KEY (id)
);

INSERT INTO users(name, password) VALUES
  ('testuser1', 'pwoftest1','test1@gmail.com'),
  ('testuser2', 'pwoftest2','test2@gmail.com'),
  ('testuser3', 'pwoftest3','test3@gmail.com'),
  ('testuser4', 'pwoftest4','test4@gmail.com'),
  ('testuser5', 'pwoftest5','test5@gmail.com')
;

CREATE TABLE tokens (
  id SERIAL,
  token VARCHAR UNIQUE,
  expire TIMESTAMP WITHOUT TIME ZONE,
  userid INTEGER,
  PRIMARY KEY (id)
);

CREATE TABLE projects (
  id SERIAL,
  name VARCHAR NOT NULL ,
  userid INTEGER,
  PRIMARY KEY (id)
);

INSERT INTO projects(name,userid) VALUES
  ('sound_create',1),
  ('count_infected',1),
  ('task_manager',1),
  ('project1 of user2',2),
  ('project2 of user2',2),
  ('project3 of user2',2),
  ('project1 of user3',3),
  ('project2 of user3',3),
  ('project3 of user3',3),
  ('project1 of user4',4),
  ('project2 of user4',4),
  ('project3 of user4',4),
  ('project1 of user5',5),
  ('project2 of user5',5),
  ('project3 of user5',5)
;

CREATE TABLE tasks (
  id SERIAL,
  name VARCHAR NOT NULL,
  projectid INTEGER,
  deadline DATE,
  taskpriority INTEGER,
  PRIMARY KEY (id)
);

INSERT INTO tasks(name,projectid,deadline,taskpriority) VALUES
  ('Refactor the code.',1,'2021-09-01',1),
  ('Make edit-song-function for users',1,'2021-09-11',2),
  ('Improve security.Enrich the authentication.',1,'2021-09-16',3,
  ('Improve security.Enrich the authentication',2,'2021-09-01',1),
  ('Modify menu bar',2,'2021-09-01',2),
  ('Get enough Icon',2,'2021-09-01',3),
  ('create go-api',3,'2021-09-01',1),
  ('create frontend with ts',3,'2021-09-01',2),
  ('learn postgresql',3,'2021-09-01',3),
  ('task1 of project1 of user2',4,'2021-11-01',1),
  ('task2 of project1 of user2',4,'2021-11-01',2),
  ('task3 of project1 of user2',4,'2021-11-01',3),
  ('task1 of project2 of user2',5,'2021-11-01',1),
  ('task2 of project2 of user2',5,'2021-11-01',2),
  ('task3 of project2 of user2',5,'2021-11-01',3),
  ('task1 of project3 of user2',6,'2021-11-01',1),
  ('task2 of project3 of user2',6,'2021-11-01',2),
  ('task3 of project3 of user2',6,'2021-11-01',3),
  ('task1 of project1 of user3',7,'2021-11-01',1),
  ('task2 of project1 of user3',7,'2021-11-01',2),
  ('task3 of project1 of user3',7,'2021-11-01',3),
  ('task1 of project2 of user3',8,'2021-11-01',1),
  ('task2 of project2 of user3',8,'2021-11-01',2),
  ('task3 of project2 of user3',8,'2021-11-01',3),
  ('task1 of project3 of user3',9,'2021-11-01',1),
  ('task2 of project3 of user3',9,'2021-11-01',2),
  ('task3 of project3 of user3',9,'2021-11-01',3),
  ('task1 of project1 of user4',10,'2021-11-01',1),
  ('task2 of project1 of user4',10,'2021-11-01',2),
  ('task3 of project1 of user4',10,'2021-11-01',3),
  ('task1 of project2 of user4',11,'2021-11-01',1),
  ('task2 of project2 of user4',11,'2021-11-01',2),
  ('task3 of project2 of user4',11,'2021-11-01',3),
  ('task1 of project3 of user4',12,'2021-11-01',1),
  ('task2 of project3 of user4',12,'2021-11-01',2),
  ('task3 of project3 of user4',12,'2021-11-01',3),
  ('task1 of project1 of user5',13,'2021-11-01',1),
  ('task2 of project1 of user5',13,'2021-11-01',2),
  ('task3 of project1 of user5',13,'2021-11-01',3),
  ('task1 of project2 of user5',14,'2021-11-01',1),
  ('task2 of project2 of user5',14,'2021-11-01',2),
  ('task3 of project2 of user5',14,'2021-11-01',3),
  ('task1 of project3 of user5',15,'2021-11-01',1),
  ('task2 of project3 of user5',15,'2021-11-01',2),
  ('task3 of project3 of user5',15,'2021-11-01',3)
;
