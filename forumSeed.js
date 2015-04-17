var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumData.db');

db.run("INSERT INTO topics (title, body, vote, author) VALUES ('My Life as a Programmer', 'I sure do love coding as a GA student. It is the tits.', 0, 'Cary Lynch');");

db.run("INSERT INTO comments (comment, location, topics_id) VALUES ('I heard GA is totally the tits.', 'NYC', 1);");