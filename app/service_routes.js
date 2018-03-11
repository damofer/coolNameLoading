var dbconfig = require('../config/database.js');
var request = require('ajax-request');
module.exports = function(app,connection) {



	app.get('/getAllLogs',function(req,resp){
		// about mysql
		// can filter with req.user.ROL if needed 
		connection.getConnection(function(error,tempCont){
			if(!!error){
				tempCont.release();
				console.log('Error');

			}else{
				var id =req.user.ID;
				console.log('Connected!');
				
					var q ="SELECT l.ID AS ID, l.USER_ID AS USER_ID, l.MOVIE_ID AS MOVIE_ID, l.MOVIE_NAME AS MOVIE_NAME, l.TIMESTAMP AS DATE \
					 FROM "+dbconfig.logs_table+" AS l \
					 INNER JOIN "+dbconfig.users_table+" AS u ON l.USER_ID = u.ID\
					 WHERE l.USER_ID = "+id+"\
					 ORDER BY DATE DESC\
					 LIMIT 30";
					

			}
				


				tempCont.query(q,
				function(error,rows,fields){
					tempCont.release();
					if(!!error){
						console.log("Error with the query getAllLogs",error);
					}else{
						resp.json(rows);
					}
				})
			});
		});

	app.post('/newLog',function(req,resp){
	    var user_id = req.body.user_id,
	    	movie_id = req.body.movie_id,
	    	movie_name = req.body.movie_name;
	      
		connection.getConnection(function(error,tempCont){
			if(!!error){
				tempCont.release();
				console.log('Error');

			}else{
			
				console.log('Connected!');
				
					
					var q = "INSERT INTO `"+dbconfig.logs_table+"`( USER_ID, MOVIE_ID, MOVIE_NAME) VALUES ("+user_id+",'"+movie_id+"','"+movie_name+"')";
					

			}
				


				tempCont.query(q,
				function(error,rows,fields){
					tempCont.release();
					if(!!error){
						console.log(error);
						resp.end(resp.statusCode.toString());
					}else{
						
						console.log("ticket submited");								
						resp.end(resp.statusCode.toString());
					}
				})
			});
		});

	app.get('/getAllMovies',function(req,resp){
		// about mysql
		
	
		 var base_uri = 'https://demo2697834.mockable.io/movies';
		 request(base_uri, function(err, res, body) {

		 	resp.json(JSON.parse(body));
		 });
		
	});



    
}



