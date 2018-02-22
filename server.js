//Import dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect to mongoDB server
mongoose.connect('mongodb://localhost/tournois');
mongoose.set('debug', true);

//Require the models

//Get our API routes
var router = require('express').Router();

//Init express
const app = express();

//Enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
 
//Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    console.log("CORS headers added");
    next();
   });
   

//Get environment port or use 3000
const port = process.env.PORT || '3000';
app.set('port', port);
 
//Create HTTP server.
const server = http.createServer(app);
 
//Listen on port
server.listen(port, () => console.log(`API running on localhost:${port}`));

router.post('/api/fblogin', function(req, res, next) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name', 'picture', 'location', 'languages', 'gender', 'birthday'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: '36d4b1d85e21c57e4f66307a58e46d15',
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
        console.log("accessToken", accessToken);
        if (!response || response.statusCode !== 200) {
            return res.status(500).send({ message: accessToken.error.message });
        }
    });

    // Step 2. Retrieve profile information about the current user.
    request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
        if (response.statusCode !== 200) {
        return res.status(500).send({ message: profile.error.message });
        }
        //process facebook profile information here
        var fbUser = {id: response.body.id, email: response.body.email, first_name: response.body.first_name, last_name: response.body.last_name, birthday: response.body.birthday};
        console.log(response.body.id, response.body.email, response.body.first_name, response.body.last_name, response.body.birthday)
        //you can check if user already exist in your db, if not you can create it
            

        // return the information including token as JSON to the front end
        res.status(200).send({ user : fbUser });

    });
});
