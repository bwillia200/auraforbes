var Sequelize = require('sequelize');


var initialize = new Sequelize({
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST || "localhost",
	port: process.env.DB_PORT || 5432,
	dialect: "postgres",
});


//datebase for test_user...
var User = initialize.define('test_user', {
  firstname: Sequelize.STRING,
	lastname: Sequelize.STRING
});


function CreateUsers(){
	User.sync().then(function(){
		User.create({
			firstname: 'jackson',
			lastname: 'pollock'
		})
		User.create({
			firstname: 'sylvia',
			lastname: 'plath'
		})
		User.create({
			firstname: 'daenerys',
			lastname: 'targaryen'
		})
	})

}

CreateUsers();

var ormlite ={

	allThings: function(callback){
		User.findAll().then(function(rows){
			callback(rows);
		})
	},

	findById: function(id, callback){
		User.findById(id).then(function(row){
			callback(row);
		})
	}

}





module.exports = ormlite;
