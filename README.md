mongolog.js
===========

### Log everything everywhere, monolog for javascript and node

Monolog.js is heavily inspired by [monolog](https://github.com/Seldaek/monolog) PHP library that was written by mparaiso <mparaiso@online.fr> and now rewritten again.



### Installation
 
	npm install -g monolog.js

#### Handlers

- ConsoleLogHandler : log to console
- StreamHandler : log to a stream
- CouchDBHandler : log to CouchDB
- MongoDBHandler : log to MongoDB
- TestHandler : log to an array
- NullHandler : logging to /dev/null

#### Processors (work in progress)

- ExpressProcessor : get express request data
- WebProcessor : get server data

#### Formatters

- JSONFormatter : format log to JSON
- LineFormatter : format log to a string

###Usage

####Basic usage

```javascript
	var {Logger, formatter, handler} = require('monolog.js');

	// create log channel
	var log = new Logger('name')

	// make formatter
	var jsonFormat = new formatter.JSONFormatter();
	// create handler
	var consoleLog = new handler.ConsoleLogHandler(Logger.DEBUG);
	//set formatter for handler
	consoleLog.setFormatter(jsonFormat);
	// add handler to created channel
	log.addHandler(consoleLog);

	// save all logs to file
	log.pushHandler(new StreamHandler('/path/to/your.log',Logger.DEBUG));

	// add records to the log
	log.info('InFo');
	log.warning('Foo');
	log.error('Bar');
	log.debug('Baz');
```


#### CouchDB Logging

```javascript
	
	const {Logger, handler} = require('monolog');
	logger = new Logger("couchdb logger");
	logger.pushHandler(new handler.CouchDBHandler({
		host:"localhost",
		dbname:"logger"
	}));
	
	logger.info('Logging to couchdb');
```

#### MongoDB Logging ( with mongodb package)

```javascript
	
	const {Logger, handler} = require('monolog');
	const mongodb = require('mongodb').MongoClient.connect("localhost",function(err,db){
		logger = new Logger("channel name");
		logger.pushHandler(new handler.MongoDBHandler(db,"log_collection"));
		logger.info("log message");
	});

```

Missing express.js and webServer processors will be soon.