var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forumData.db');

var express = require('express');
var sqlite3 = require('sqlite3');
var fs = require('mustache');
var morgan = require('morgan');
var bodyparser = require('method-override');

var db