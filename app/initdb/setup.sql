CREATE TABLE users (
  id SERIAL PRIMARY KEY ,
  name VARCHAR NOT NULL ,
  password VARCHAR NOT NULL
);

INSERT INTO users(name, password) VALUES
  ('testuser1', 'pwoftest1'),
  ('testuser2', 'pwoftest2'),
  ('testuser3', 'pwoftest3'),
  ('testuser4', 'pwoftest4'),
  ('testuser5', 'pwoftest5')
;

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
);

INSERT INTO projects(name) VALUES
  ('sound_create'),
  ('count_infected'),
  ('task_manager')
;

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
)

INSERT INTO tasks(name) VALUES
  ('create go-api'),
  ('create frontend with ts'),
  ('learn postgresql')
;
