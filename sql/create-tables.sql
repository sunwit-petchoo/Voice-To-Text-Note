
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  passwords VARCHAR(64) NOT NULL
);


DROP TABLE IF EXISTS memo_list cascade;
CREATE TABLE IF NOT EXISTS memo_list (
   memo_id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   memo_name VARCHAR(64) NOT NULL,
   type VARCHAR(64) NOT NULL,
   create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS memo_item;
CREATE TABLE IF NOT EXISTS memo_item (
   memo_id INT NOT NULL,
   memo_content TEXT NOT NULL,
   CONSTRAINT fk_memo_item
      FOREIGN KEY(memo_id) 
	  REFERENCES memo_list(memo_id)
);

DROP TABLE IF EXISTS check_list cascade;
CREATE TABLE IF NOT EXISTS check_list (
   check_id SERIAL PRIMARY KEY,
   user_id INT NOT NULL,
   check_name VARCHAR(64) NOT NULL,
   type VARCHAR(64) NOT NULL,
   create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS check_item;
CREATE TABLE IF NOT EXISTS check_item (
   check_item_id SERIAL PRIMARY KEY,
   check_id INT NOT NULL,
   check_content TEXT NOT NULL,
   status INT NOT NULL,
   CONSTRAINT fk_check_item
      FOREIGN KEY(check_id) 
	  REFERENCES check_list(check_id)
);
