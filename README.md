# coolNameLoading

Instructions to install and configure prerequisites or dependencies

* run : npm install

Instructions to create and initialize the database (if required)

at This point, you will find a config folder, inside there is a database.js file in this file you will be able to set your server credentials and the database.

if the database is not created, 

* run: node build_scripts/create_database.js

this command will build your DB propertly using the configuration variables in the database.js file.

Instructions to configure and prepare the source code to build and run properly

once your database is set, 

* run: node scripts.js to start the server.

* go to localhost:3000 to see the front-end.

if it is the first time you are using the server and the database, signup your user with the access level you need.
