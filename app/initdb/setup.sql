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
  name VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO projects(id,name) VALUES
  ('0001','sound_create'),
  ('0002','count_infected'),
  ('0003','task_manager')
;

CREATE TABLE tasks (
  id CHAR(4) NOT NULL,
  name VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tasks(id,name) VALUES
  ('0001','create go-api'),
  ('0002','create frontend with ts'),
  ('0003','learn postgresql')
;
