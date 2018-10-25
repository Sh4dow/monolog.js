mongolog.js
===========

###Log everything everywhere, monolog for javascript and node

Monolog.js is heavily inspired by [monolog](https://github.com/Seldaek/monolog) PHP library that was written by mparaiso <mparaiso@online.fr> and now rewritten again



###Installation

	npm install -g monolog.js

####Handlers

- ConsoleLogHandler : log to console
- StreamHandler : log to a stream
- CouchDBHandler : log to CouchDB
- MongoDBHandler : log to MongoDB
- TestHandler : log to an array
- NullHandler : null logging

####Processors (work in progress)

- ExpressProcessor : get express request data
- WebProcessor : get server data

####Formatters

- JSONFormatter : format log to JSON
- LineFormatter : format log to a string

###Usage

####Basic usage

```javascript
	var {Logger, formatter, handler} = require('monolog.js');

	var log = new Logger('name')

	var jsonFormat = new formatter.JSONFormatter();
	var consoleLog = new handler.ConsoleLogHandler(Logger.DEBUG);
	// consoleLog.setFormatter(jsonFormat);
	log.addHandler(consoleLog);

	// add records to the log
	log.info('InFo');
	log.warning('Foo');
	log.error('Bar');
	log.debug('Baz');
	
	//create a Log channel
	var log = new Logger('name')
	//create a Log handler
	log.pushHandler(new StreamHandler('/path/to/your.log',Logger.DEBUG))
	//listen to log events

	var jsonFormat = new formatter.JSONFormatter();
	var consoleLog = new handler.ConsoleLogHandler()

	log.on("log",function(error,record,handler){console.log(arguments)});
	// add records to the log
	log.warn('Foo')
	log.err('Bar')
	log.debug('Baz')
```

####Server request logging

```javascript
	var http, logger, monolog, port, server, webProcessor;

	http = require('http');
	monolog = require('monolog');
	port = 3000;
	server = http.createServer();
	logger = new monolog.Logger("server logger");
	logger.pushHandler(new monolog.handler.ConsoleLogHandler);
	// a WebProcessor extracts data from each request and add it to the log records
	logger.pushProcessor(new monolog.processor.WebProcessor(server));

	server.on('request', function(req, res) {
	  logger.info('logging request');
	  return res.end('ok!');
	});

	server.listen(3000);

	console.log("listening on port " + port);
```

#### CouchDB Logging

```javascript
	var monolog,logger;

	monolog=require('monolog');
	logger = new monolog.Logger("couchdb logger");
	logger.pushHandler(new monolog.handler.CouchDBHandler({
		host:"localhost",
		dbname:"logger"
	}));
	logger.on('log',function(err,res,record,handler){
		console.log(arguments);
	});
	logger.info('Logging to couchdb');
```
#### MongoDB Logging ( with mongodb package)

```javascript
	var monolog,logger,mongodb;
	monolog=require('monolog');
	mongodb = require('mongodb').MongoClient.connect("localhost",function(err,db){
		logger=new monolog.Logger("channel name");
		logger.pushHandler(new monolog.handler.MongoDBHandler(db,"log_collection"));
		logger.info("log message");
	});

```

#### Creating a simple logger middleware for express

in a file called logger.js

```javascript
	 "use strict";
	 /**
	  * monolog middleware for connect and express
	  * USAGE
	  * =====
	  * var app=express()
	  * app.use(logger.middleware(app,"debugging"));
	  * 
	  */
	 var monolog = require('monolog');
	 /**
	  * @type {monolog.Logger}
	  */
	 var logger = new monolog.Logger("express logger");

	 logger.addHandler(new monolog.handler.StreamHandler(__dirname + "/../temp/log.txt"));
	 /**
	  * [middleware description]
	  * @param  {Express} app     express app
	  * @param  {String} message log message
	  * @return {Function}         middleware
	  */
	 logger.middleware = function(app, message) {
	 	message = message || "debug";
	 	logger.addProcessor(new monolog.processor.ExpressProcessor(app));
	 	app.set('logger', logger);
	 	var F =  function(req, res, next) {
	 		logger.debug(message);
	 		next();
	 	};
	 	F.logger = logger;
	 	return F;
	 };

	 module.exports = logger;
```