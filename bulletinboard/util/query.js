const pg = require("pg");
const url = require("url");

// Create the config object
let config;

if (process.env.DATABASE_URL) {
	const params = url.parse(process.env.DATABASE_URL);
	const auth = params.auth.split(":");

	config = {
		database: params.pathname.split('/')[1],
		user: auth[0],
		password: auth[1],
		host: params.hostname,
		port: params.port,
		ssl: true,
	};
}
else {
	config = {
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 5432,
	};
}

// Handle missing config args
if (!config.user || !config.database) {
	console.error("Missing database configuration!", config);
	process.exit(1);
}

// Create the shared pool object
const pool = new pg.Pool(config);

// Add a little handler for general database errors. This
// won't trigger on individual query errors, but will handle
// things like if the database we try to connect to isn't
// available, our database runs out of room etc.
pool.on("error", function(err) {
	console.error("Postgres query pool encountered an error", err);
});

// Export a simple function that just runs a query using our pool
module.exports = function(queryString, values, cb) {
	return pool.query(queryString, values, cb);
};
