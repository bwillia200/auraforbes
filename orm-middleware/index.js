var express = require('express');
var orm = require('./orm-lite');
var app = express();

var getAll = function(req, res, next){
	console.log('orm-lite');

	orm.allThings(function(data){
		console.log(data);
	})

	next()
}

var getByID = function(req, res, next){
	console.log('orm-lite');

	orm.findById(2, function(data){
		console.log(data);
	})

	next()
}

app.use(getAll);
app.use(getByID);


app.get('*',function(req, res){
	res.send('refresh the browser once and look at your terminal')
})


app.listen(process.env.PORT || 4000,function(){
  console.log('app is listening on port 4000');
})
