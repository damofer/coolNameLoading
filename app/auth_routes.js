// app/routes.js
module.exports = function(app, passport) {
	// route middleware to make sure user is logged in
	
app.get('/isLoggedIn',authMiddleware ,function(req,res){
	
		var user ={
			"id":req.user.ID,
			"username":req.user.USERNAME,
			"email":req.user.EMAIL
			
		};
	
		return res.status(200).send(user);

});
function authMiddleware(req,res,next){
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		
		
		return next();
		
	}else{

	// if they aren't redirect them to the home page

	return res.status(200).send(null);

	}
}

	// =====================================
	// LOGIN ===============================
	// =====================================
	
	
	app.post('/login',passport.authenticate('local-login', {
            successRedirect : '/#!/dashboard', // redirect to the secure profile section
            failureRedirect : '/#!/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
		}) ,function(req, res) {

		console.log("entro en post de Login")
		
/*add user to session*/
		 if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
           
          
	});


	// =====================================
	// SIGNUP ==============================
	// =====================================

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/#!/login', // redirect to the secure profile section
		failureRedirect : '/#!/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {

		req.logout();
		console.log("is Auth = " , req.isAuthenticated());
		res.redirect('/#!/');
	});
};

