var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware'); //<--This automatically requires ../middleware/index.js .. index.js is speacial.. if you require a directory, it automatically requires index.js inside that directory

//INDEX - Show all campgrounds
router.get('/', function(req, res){
   //Get all campgrounds from db... then render
   Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
       }
   });
});
//NEW - show form to create new campground
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});
//CREATE - Add new route to database
router.post('/', middleware.isLoggedIn, function(req, res) {
   //Get data from form
   var name = req.body.name;
   var image = req.body.image;
   var price = req.body.price;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description: desc, author: author, price: price};
   //Create new campground and save to Database...
   Campground.create(newCampground, function(err, newlyCreated) {
       if(err){
           console.log(err);
       } else {
            //redir back to campground page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
       }
   });
});
//SHOW - shows more info about one campground
router.get('/:id', function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that ID
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});
//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) { //<- we really dont need this check, as it is checked in the middleware, but the ide was complaining about not checking it.
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});
//UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground) {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});
//DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;