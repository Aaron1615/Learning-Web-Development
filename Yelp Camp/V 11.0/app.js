var express          = require("express"),
        app          = express(),
        bodyParser   = require("body-parser"),
        mongoose     = require("mongoose"),
        flash        = require("connect-flash"),
        passport     = require("passport"),
        LocalStrategy= require("passport-local"),
        methodOveride = require("method-override"),
        Campground   = require("./models/campground"),
        seedDB       = require("./seeds"),
        Comment      = require("./models/comment"),
        User         = require("./models/user");

//requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");


//Seed The Database
//seedDB();




mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOveride("_method"));
app.use(flash());

//PASSPORT CONFIG

app.use(require("express-session")({
    secret: "MEH",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
// "/campgrounds" adds that string to all routes, avoiding the need for repetition
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});