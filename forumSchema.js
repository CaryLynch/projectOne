var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumData.db');


db.run("CREATE TABLE topics (id INTEGER PRIMARY KEY AUTOINCREMENT, title varchar, body text, vote integer, author varchar);");

db.run("CREATE TABLE comments (comment text, location varchar, topic_id integer, FOREIGN KEY(topic_id) REFERENCES topics(id));");