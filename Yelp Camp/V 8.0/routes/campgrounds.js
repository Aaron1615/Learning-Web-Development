var express = require("express");
var router = express.Router();
var Campground= require("../models/campground");

//Index Route
router.get("/", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campground/index", {campgrounds:allCampgrounds, currentUser: req.user});
        }
    });
});

//Create Route
router.post("/", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground ={name: name, image: image, description: description};
    //create a new campground ansd save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    });
});

//NEW- show form to create new campground
router.get("/new", function(req, res) {
   res.render("campground/new.ejs"); 
});

//SHOW        shows more info about one campground
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            res.render("campground/show", {campground: foundCampground});
        }
    });
});

module.exports = router;