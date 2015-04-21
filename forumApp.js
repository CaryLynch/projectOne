var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumData.db');

var fs = require('fs');
var request = require('request');
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
  db.all("SELECT * FROM topics ORDER BY vote DESC", function(err, topics){
      console.log(topics);
    var html = Mustache.render(template, {allTopics: topics});
    res.send(html);
  });
});

// page where all topics are listed according to number of comments and a user can add a new topic
app.get('/topics/reorder', function(req, res){
  var template = fs.readFileSync('./views/topics/index2.html', 'utf8');
  //selecting number of times each individual topic id shows up in the comments table then groups them together by their topics id number and the orders them by the number of times they are there. 
  // db.all("SELECT count(topics_id) FROM comments GROUP BY topics_id ORDER BY count(topics_id) DESC;", 
db.all("SELECT * FROM topics LEFT JOIN comments WHERE id = topics_id GROUP BY title ORDER BY count(topics_id) DESC;", function(err, topics){
    console.log(topics);
    var html = Mustache.render(template, {allTopics: topics});
    res.send(html);
  });
});

// db.all('SELECT * FROM topics LEFT JOIN comments WHERE topicID = trackTopic GROUP BY topic ORDER BY count(trackerID) DESC;'
// app.get('/topics/comments', topics.getByComments);

// A J Abdelaziz [6:54 PM]
// getByComments: function (req, res) {
//   var template = fs.readFileSync('./views/byComments.html', 'utf8');
 
//   db.all('SELECT * FROM topics LEFT OUTER JOIN comments WHERE topicID = trackTopic GROUP BY topic ORDER BY entry DESC;', function (err, topics) {
//     var html = Mustache.render(template, {allTopics: topics});
//     res.send(html);
//   })

//  },

// db.run("SELECT * FROM topics LEFT JOIN comments GROUP BY comment ORDER BY DESC")

 // SELECT NAME, SUM(SALARY) 
 //         FROM COMPANY GROUP BY NAME ORDER BY NAME DESC;

app.get('/topics/new', function(req, res){
  var read = fs.readFileSync('./views/topics/new.html', 'utf8');
  res.send(read);
}); 

// this post inserts a new topic into the topic table and then redirects to the list page (get('.topics'))
app.post('/topics/create', function(req, res){
  console.log(req.body);
  // var newBody = req.body.replace("/\/", "andy" );
  // console.log(newBody)
  db.run("INSERT INTO topics (title, body, vote, author) VALUES ('" + req.body.title + "', '" + req.body.body + "', '" + req.body.vote + "', '" + req.body.author + "')");
  res.redirect('/topics');
}); 

// this post inserts a new comment and the users location into the comment table and then redirects to the list page (get('.topics'))
app.post('/topics/:id/comment', function(req, response){
  // console.log(comments[0].length);
  var id = req.params.id;
  // console.log(req.body);
  request.get("http://ipinfo.io/geo", function(err, res, body) {
    var parsedBody = JSON.parse(body);
    var location = parsedBody.city+ ', ' +parsedBody.region;
    db.run("INSERT INTO comments (comment, location, topics_id) VALUES ('" + req.body.comments + "', '" + location + "', " + id + ");");
      response.redirect('/topics/' + id);
  });
}); 

//this is how the vote is edited in the toics table
app.put('/topics/:id', function(req, response){
    var id = req.params.id;
    db.run("UPDATE topics SET vote = vote + 1 WHERE id = "+ id+";");
    response.redirect('/topics/' + id);
});

// page that displays the individual topics and their comments with the ability to vote for that topic and add a comment
app.get('/topics/:id', function(req, res){
  // console.log(comments.comment.length);
  var id = req.params.id;
  // var renderedHTML;
  db.all("SELECT * FROM topics WHERE id = " + id + ";", {}, function(err, topic){
    db.all("SELECT * FROM comments WHERE topics_id = " + id + ";", {}, function(err, comments){
          // console.log(comments);
          fs.readFile('./views/topics/show.html', 'utf8', function(err, temp){
            // console.log(topic);
            var renderedHTML = Mustache.render(temp, {id:topic[0].id, title:topic[0].title,  body:topic[0].body, author:topic[0].author, vote:topic[0].vote, comments: comments});
             res.send(renderedHTML);
         });     
      });
    });
});

app.listen(3000, function() {
  console.log("LISTENING!");
});