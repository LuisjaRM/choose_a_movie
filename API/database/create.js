require("dotenv").config();

// Connection require
const { getConnection } = require("./connection");

// npm require
const chalk = require("chalk");

const createDatabase = async () => {
  let connection;

  try {
    connection = await getConnection();

    console.log(chalk.blue("Deleting tables"));

    await connection.query(`DROP TABLE IF EXISTS videos`);
    await connection.query(`DROP TABLE IF EXISTS documentaries`);
    await connection.query(`DROP TABLE IF EXISTS series`);
    await connection.query(`DROP TABLE IF EXISTS movies`);
    await connection.query(`DROP TABLE IF EXISTS room_users`);
    await connection.query(`DROP TABLE IF EXISTS rooms`);
    await connection.query(`DROP TABLE IF EXISTS friends`);
    await connection.query(`DROP TABLE IF EXISTS notifications`);
    await connection.query(`DROP TABLE IF EXISTS users`);

    console.log(chalk.blue("Creating tables"));

    await connection.query(`
      CREATE TABLE users (
         id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
         email VARCHAR(100) NOT NULL,
         username VARCHAR(100) NOT NULL,
         password VARCHAR(100) NOT NULL,
         avatar VARCHAR(250),
         phone CHAR(9),
         deleted BOOLEAN DEFAULT false,
         active BOOLEAN DEFAULT false,
         regCode CHAR(36),
         recoverCode CHAR(36),
         lastAuthUpdate DATETIME,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

    await connection.query(`
      CREATE TABLE notifications (
         id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
         host_id INTEGER UNSIGNED NOT NULL,
         guest_id INT UNSIGNED NOT NULL,
         message VARCHAR(280) NOT NULL,
         readed BOOLEAN DEFAULT false,
         date DATETIME DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (host_id) REFERENCES users(id),
         FOREIGN KEY (guest_id) REFERENCES users(id)
      )`);

    await connection.query(`
      CREATE TABLE friends (
         host_id INTEGER UNSIGNED NOT NULL,
         guest_id INT UNSIGNED,
         email VARCHAR(100),
         are_friends BOOLEAN DEFAULT false,
         regCode CHAR(36),
         FOREIGN KEY (host_id) REFERENCES users(id),
         FOREIGN KEY (guest_id) REFERENCES users(id),
         UNIQUE (host_id, guest_id)
      )`);

    await connection.query(`
      CREATE TABLE rooms (
         id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
         created_by INTEGER UNSIGNED NOT NULL,
         title VARCHAR(60) NOT NULL,
         avatar VARCHAR(250),
         regCode CHAR(36),
         deleted BOOLEAN DEFAULT false,
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (created_by) REFERENCES users(id),
         UNIQUE (created_by, title)
      )`);

    await connection.query(`
      CREATE TABLE room_users (
         user_id INTEGER UNSIGNED NOT NULL,
         room_id INT UNSIGNED NOT NULL,
         FOREIGN KEY (user_id) REFERENCES users(id),
         FOREIGN KEY (room_id) REFERENCES rooms(id)
      )`);

    await connection.query(`
     CREATE TABLE movies (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER UNSIGNED NOT NULL,
        room_id INTEGER UNSIGNED NOT NULL,
        title VARCHAR(60) NOT NULL,
        url VARCHAR(280),
        platform ENUM("HBO", "Netflix", "Disney-Plus", "Amazon-Prime", "Filmin", "Apple", "Movistar", "Youtube", "Twitch", "Others"),
        photo VARCHAR(250),
        order_value INTEGER,
        is_check BOOLEAN DEFAULT false,
        deleted BOOLEAN DEFAULT false,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
     )`);

    await connection.query(`
     CREATE TABLE series (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER UNSIGNED NOT NULL,
        room_id INTEGER UNSIGNED NOT NULL,
        title VARCHAR(60) NOT NULL,
        url VARCHAR(280),
        platform ENUM("HBO", "Netflix", "Disney-Plus", "Amazon-Prime", "Filmin", "Apple", "Movistar", "Youtube", "Twitch", "Others"),
        photo VARCHAR(250),
        order_value INTEGER,
        is_check BOOLEAN DEFAULT false,
        deleted BOOLEAN DEFAULT false,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
     )`);

    await connection.query(`
     CREATE TABLE documentaries (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER UNSIGNED NOT NULL,
        room_id INTEGER UNSIGNED NOT NULL,
        title VARCHAR(60) NOT NULL,
        url VARCHAR(280),
        platform ENUM("HBO", "Netflix", "Disney-Plus", "Amazon-Prime", "Filmin", "Apple", "Movistar", "Youtube", "Twitch", "Others"),
        photo VARCHAR(250),
        order_value INTEGER,
        is_check BOOLEAN DEFAULT false,
        deleted BOOLEAN DEFAULT false,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
     )`);

    await connection.query(`
     CREATE TABLE videos (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER UNSIGNED NOT NULL,
        room_id INTEGER UNSIGNED NOT NULL,
        title VARCHAR(60) NOT NULL,
        url VARCHAR(280),
        platform ENUM("HBO", "Netflix", "Disney-Plus", "Amazon-Prime", "Filmin", "Apple", "Movistar", "Youtube", "Twitch", "Others"),
        photo VARCHAR(250),
        order_value INTEGER,
        is_check BOOLEAN DEFAULT false,
        deleted BOOLEAN DEFAULT false,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
     )`);

    console.log(chalk.yellow("Database created"));
  } catch (error) {
    console.error(chalk.red(error));
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

createDatabase();
