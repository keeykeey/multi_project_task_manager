CREATE TABLE users (
  id CHAR(4) NOT NULL ,
  name VARCHAR NOT NULL ,
  password VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users(id,name, password) VALUES
  ('0001','testuser1', 'pwoftest1'),
  ('0002','testuser2', 'pwoftest2'),
  ('0003','testuser3', 'pwoftest3'),
  ('0004','testuser4', 'pwoftest4'),
  ('0005','testuser5', 'pwoftest5')
;

CREATE TABLE projects (
  id CHAR(4) NOT NULL,
  name VARCHAR NOT NULL ,
  userid CHAR(4),
  PRIMARY KEY (id)
);

INSERT INTO projects(id,name,userid) VALUES
  ('0001','sound_create','0001'),
  ('0002','count_infected','0001'),
  ('0003','task_manager','0001'),
  ('0004','project1 of user2','0002'),
  ('0005','project2 of user2','0002'),
  ('0006','project3 of user2','0002'),
  ('0007','project1 of user3','0003'),
  ('0008','project2 of user3','0003'),
  ('0009','project3 of user3','0003'),
  ('0010','project1 of user4','0004'),
  ('0011','project2 of user4','0004'),
  ('0012','project3 of user4','0004'),
  ('0013','project1 of user5','0005'),
  ('0014','project2 of user5','0005'),
  ('0015','project3 of user5','0005')
;

CREATE TABLE tasks (
  id CHAR(4) NOT NULL,
  name VARCHAR NOT NULL,
  projectid CHAR(4) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tasks(id,name,projectid) VALUES
  ('0001','Refactor the code.','0001'),
  ('0002','Make edit-song-function for users','0001'),
  ('0003','Improve security.Enrich the authentication.','0001'),
  ('0004','Improve security.Enrich the authentication','0002'),
  ('0005','Modify menu bar','0002'),
  ('0006','Get enough Icon','0002'),
  ('0007','create go-api','0003'),
  ('0008','create frontend with ts','0003'),
  ('0009','learn postgresql','0003'),
  ('0010','task1 of project1 of user2','0004'),
  ('0011','task1 of project1 of user2','0004'),
  ('0012','task1 of project1 of user2','0004'),
  ('0013','task1 of project2 of user2','0005'),
  ('0014','task1 of project2 of user2','0005'),
  ('0015','task1 of project2 of user2','0005'),
  ('0016','task1 of project3 of user2','0006'),
  ('0017','task1 of project3 of user2','0006'),
  ('0018','task1 of project3 of user2','0006'),
  ('0019','task1 of project1 of user3','0007'),
  ('0020','task1 of project1 of user3','0007'),
  ('0021','task1 of project1 of user3','0007'),
  ('0022','task1 of project2 of user3','0008'),
  ('0023','task1 of project2 of user3','0008'),
  ('0024','task1 of project2 of user3','0008'),
  ('0025','task1 of project3 of user3','0009'),
  ('0026','task1 of project3 of user3','0009'),
  ('0027','task1 of project3 of user3','0009'),
  ('0028','task1 of project1 of user4','0010'),
  ('0029','task1 of project1 of user4','0010'),
  ('0030','task1 of project1 of user4','0010'),
  ('0031','task1 of project2 of user4','0011'),
  ('0032','task1 of project2 of user4','0011'),
  ('0033','task1 of project2 of user4','0011'),
  ('0034','task1 of project3 of user4','0012'),
  ('0035','task1 of project3 of user4','0012'),
  ('0036','task1 of project3 of user4','0012'),
  ('0037','task1 of project1 of user5','0013'),
  ('0038','task1 of project1 of user5','0013'),
  ('0039','task1 of project1 of user5','0013'),
  ('0040','task1 of project2 of user5','0014'),
  ('0041','task1 of project2 of user5','0014'),
  ('0042','task1 of project2 of user5','0014'),
  ('0043','task1 of project3 of user5','0015'),
  ('0044','task1 of project3 of user5','0015'),
  ('0045','task1 of project3 of user5','0015')
;
