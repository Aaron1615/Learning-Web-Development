var express         = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose")
        


mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true }));

// var campgrounds = [
//         {name: "Salmon Peak", image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810-1024x576.jpg"},
//         {name: "Granite Hill", image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810-1024x576.jpg"},        
//         {name: "Fancy Place", image: "http://www.guntherpublications.com/core/wp-content/uploads/2018/01/manali-girls-special-adventure-camp-himachal-pradesh-1xJtgtx-1440x810-1024x576.jpg"}
//         ];
app.set("view engine", "ejs");

// SCHEMA Setup

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
    
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
        
//         name: "Salmon Creek",
//         image: ""
//     },
    
//     function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("New campground:");
//             console.log(campground);
//         }
//     });



app.get("/", function(req, res){
    //res.send("this will be the landing page Soon!");
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds", {campgrounds:allCampgrounds})
        }
        
        
    })
    // res.render("campgrounds", {campgrounds:campgrounds});
    
});

app.post("/campgrounds", function(req, res){
    //res.send("YOu hit the post route.")
    var name = req.body.name;
    var image = req.body.image;
    var newCampground ={name: name, image: image};
    
    //create a new campground ansd save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/campgrounds");
        }
        
    })
    //campgrounds.push(newCampground);
});
//get data

//add to campgrounds
//redirectback to campgrounds page

app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
    
});

