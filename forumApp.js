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


// page that displays the individual topics and their comments with the ability to vote for that topic and add a comment
app.get('/topics/:id', function(req, res){
  var id = req.params.id;
  db.all("SELECT * FROM topics WHERE id = " + id + ";", {}, function(err, topic){
    fs.readFile('./views/topics/show.html', 'utf8', function(err, temp){
      console.log(topic);
        var renderedHTML = Mustache.render(temp, {"title":topic[0].title, "body":topic[0].body, "author":topic[0].author});

        res.send(renderedHTML);
    });
  });
});


app.listen(3000, function() {
  console.log("LISTENING!");
});