var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumData.db');


db.run("CREATE TABLE topics (id INTEGER PRIMARY KEY AUTOINCREMENT, title varchar, body text, vote integer, author varchar);");

db.run("CREATE TABLE comments (id INTEGER PRIMARY KEY AUTOINCREMENT, comment text, location varchar, topics_id integer, FOREIGN KEY(topics_id) REFERENCES topics(id));");




// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('./forum.db');

// db.run("CREATE TABLE topics (topicID INTEGER PRIMARY KEY, topic TEXT, votes INTEGER, location TEXT, author varchar);")

// db.run("CREATE TABLE comments (commentID INTEGER PRIMARY KEY, entry TEXTS,  author TEXT, location TEXT, trackTopic INTEGER, FOREIGN KEY(trackTopic) REFERENCES topics(topicID));")

// db.run("INSERT INTO topics VALUES (NULL, 'how i learned to code', '2', 'New York', 'Adam');")

// db.run("PRAGMA foreign_keys = ON;")

// db.run("INSERT INTO comments VALUES (NULL, 'I learned at GA', 'Bob', 'Hong Kong', '1');")