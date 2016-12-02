
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE favorites (
  id INT PRIMARY KEY,
  user_id INT REFERENCES users,
  favorite_item VARCHAR(255)
);
