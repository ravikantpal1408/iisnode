var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var WindowsStrategy = require('passport-windowsauth');

var app = express();
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new WindowsStrategy({
    integrated: true 
}, function(profile,done) {
    var user = {
        id: profile.id,
    };
    done(null, user);
}));




app.set('view engine', 'html');

app.use(express.static(__dirname + '/build'));

// provide template path
app.set("views", path.join(__dirname, "/build"));



app.use(bodyParser.json());


// passport.use(function(profile, done){
//     User.findOrCreate({ waId: profile.id }, function (err, user) {
//       done(err, user);
//     });
// });

app.all("*", passport.authenticate("WindowsAuthentication"), function (request,response,next){
    next();
});
app.get('/', function(req, res){
   
    
    res.sendFile(path.resolve('build/index.html'));
});

app.get('/test', function (req, res) {
    var username = req.headers['x-iisnode-_user'] || 'test';
    res.send('Hello from foo! [express sample] =>' + username);
});

// app.get("/api/testAuthentication", function(request, response){
//     console.log(request.user.id + " is authenticated");
// });

app.get('/node/express/myapp/bar', function (req, res) {
    res.send('Hello from bar! [express sample]');
});

console.log(process.env.PORT || 8090)
app.listen(process.env.PORT || 8090);