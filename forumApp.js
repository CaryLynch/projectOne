var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumData.db');

var fs = require('fs');
var express = require('express');
var sqlite3 = require('sqlite3');
var Mustache = require('mustache');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var db = new sqlite3.Database('./forumData.db');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(methodOverride('_method'));

// welcome page where the user can click the 'pick a topic' button
app.get('/', function(req, res){
  res.send(fs.readFileSync('./views/index.html', 'utf8'));
});

// page where all topics are listed and a user can add a new topic
app.get('/topics', function(req, res){
  var template = fs.readFileSync('./views/topics/index.html', 'utf8');
  db.all("SELECT * FROM topics;", function(err, topics){
    var html = Mustache.render(template, {allTopics: topics});
    res.send(html);
  });
});

app.get('/topics/new', function(req, res){
  var read = fs.readFileSync('./views/topics/new.html', 'utf8');
  res.send(read);
}); 

// this post inserts a new topic into the topic table and then redirects to the list page (get('.topics'))
app.post('/topics/create', function(req, res){
  console.log(req.body);
  db.run("INSERT INTO topics (title, body, vote, author) VALUES ('" + req.body.title + "', '" + req.body.body + "', '" + req.body.vote + "', '" + req.body.author + "')");
  res.redirect('/topics');
}); 

// this post inserts a new comment into the comment table and then redirects to the list page (get('.topics'))
app.post('/topics/:id/comment', function(req, res){
  var id = req.params.id;
  console.log("heres the" + id);
  db.run("INSERT INTO comments (comment, topics_id) VALUES ('" + req.body.comments + "', " + id + ");");
  res.redirect('/topics');
}); 

// page that displays the individual topics and their comments with the ability to vote for that topic and add a comment
app.get('/topics/:id', function(req, res){
  var id = req.params.id;
  // var renderedHTML;
  db.all("SELECT * FROM topics WHERE id = " + id + ";", {}, function(err, topic){
    db.all("SELECT * FROM comments WHERE topics_id = " + id + ";", {}, function(err, comments){
          console.log(comments);
          fs.readFile('./views/topics/show.html', 'utf8', function(err, temp){
            console.log(topic);
            renderedHTML = Mustache.render(temp, {id:topic[0].id, title:topic[0].title,  body:topic[0].body, author:topic[0].author, comments: comments});
             res.send(renderedHTML);
         });     
      });
    });
});



app.listen(3000, function() {
  console.log("LISTENING!");
});