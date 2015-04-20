var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumData.db');


db.run("CREATE TABLE topics (id INTEGER PRIMARY KEY AUTOINCREMENT, title varchar, body text, vote integer, author varchar);");

db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY AUTOINCREMENT, comment text, location varchar, topics_id integer, FOREIGN KEY(topics_id) REFERENCES topics(id));");