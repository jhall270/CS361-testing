var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


//GLOBAL VARIABLE ARRAYS SIMULATING DATABASE TABLES
function article(title, url){
  this.title = title;
  this.url = url;
}

var articles=[];
articles.push(new article("New Taco Shop Opening", "www.tacotracker.net/mrtaco-23421"));
articles.push(new article("3 Ways to Cut Your Own Hair", "www.nytimes.com/haircutting-tips-261"));
articles.push(new article("Are You Harry Potter?", "www.potter.net/harrypottertest-34231"));




//ROUTES

app.get('/',function(req,res){
  res.render('home');
});

app.get('/article-table', function(req, res){
  var context = {};
  context.articles = articles;
  res.render('article-table', context);
})

/*

app.get('/show-data',function(req,res){
  var context = {};
  context.sentData = req.query.myData;
  res.render('show-data', context);
});

app.get('/get-loopback',function(req,res){
  var qParams = "";
  for (var p in req.query){
    qParams += "The name " + p + " contains the value " + req.query[p] + ", ";
  }
  qParams = qParams.substring(0,qParams.lastIndexOf(','));
  qParams += '.';
  var context = {};
  context.dataList = qParams;
  res.render('get-loopback', context);
});

app.get('/get-loopback-improved',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get-loopback-improved', context);
});

app.post('/post-loopback', function(req,res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.dataList = qParams;
  res.render('post-loopback', context);
});

*/

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
