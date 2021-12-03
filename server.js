var express = require("express");
var app = express();
var session = require("express-session");
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views'); 

app.set('view engine', 'ejs');

app.use(session({

    secret: "secret-key",
    resave: false,
    saveUninitialized: false,

}));

app.get("/", function(request, response){

    if(request.session.random_number == undefined)
        request.session.random_number = Math.floor(Math.random() * 100) + 1;
    
    var data = {

        number: request.session.random_number,
        status: request.session.status

    }
    response.render("index", {data: data});

});

app.post("/question", function(request, response){

    if(request.body.guess == request.session.random_number){

        request.session.status = "Win";

    }
    else if(request.body.guess > request.session.random_number){

        request.session.status = "Loss";

    }
    else if(request.body.guess < request.session.random_number){

        request.session.status = "Higher";

    }
    
    response.redirect("/");
});

app.get("/reset", function(request, response){

    request.session.destroy();
    response.redirect("/");

});

app.listen(8080, function(){

    console.log("Listening on 8080");
    
});