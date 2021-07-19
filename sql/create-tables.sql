
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  passwords VARCHAR(64) NOT NULL
);


DROP TABLE IF EXISTS memo_list;
CREATE TABLE IF NOT EXISTS memo_list (
   memo_id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   memo_name VARCHAR(64) NOT NULL
);

DROP TABLE IF EXISTS memo_item;
CREATE TABLE IF NOT EXISTS memo_item (
   memo_id INT NOT NULL,
   memo_content TEXT NOT NULL,
   CONSTRAINT fk_memo_item
      FOREIGN KEY(memo_id) 
	  REFERENCES memo_list(memo_id)
);
