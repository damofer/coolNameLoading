

var mysql = require('mysql');
var dbconfig = require('../config/database.js');

var connection = mysql.createConnection(dbconfig.connection);
var string = '\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ('+
  '`ID` int(11) NOT NULL,'+
  '`USERNAME` varchar(200) COLLATE utf8_bin NOT NULL,'+
  '`EMAIL` varchar(200) COLLATE utf8_bin NOT NULL,'+
  '`PASSWORD` varchar(200) COLLATE utf8_bin NOT NULL'+  
') ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;';

//db creation
connection.query('CREATE DATABASE ' + dbconfig.database);

//table structures
connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ('+
  '`ID` int(11) NOT NULL,'+
  '`USERNAME` varchar(200) COLLATE utf8_bin NOT NULL,'+
  '`EMAIL` varchar(200) COLLATE utf8_bin NOT NULL,'+
  '`PASSWORD` varchar(200) COLLATE utf8_bin NOT NULL'+  
') ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.logs_table + '` ('+
  '`ID` int(11) NOT NULL,'+
  '`USER_ID` int(12) NOT NULL,'+
  '`MOVIE_ID` varchar(250) COLLATE utf8_bin NOT NULL,'+
  '`MOVIE_NAME` varchar(2000) COLLATE utf8_bin NOT NULL,'+
  '`TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP'+
') ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;');


//Indexes
connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.logs_table + '`\
  ADD PRIMARY KEY (`ID`);\
 ');



connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '`\
  ADD PRIMARY KEY (`ID`),\
  ADD UNIQUE KEY `USERNAME` (`USERNAME`);\
 ');

//auto increments

connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.logs_table + '`\
	MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;\
 ');

connection.query('\
ALTER TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '`\
	MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;\
 ');

console.log('Success: Database Created!')

connection.end();
