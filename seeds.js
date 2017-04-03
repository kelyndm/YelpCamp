var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg",
        description: "Tbh marfa la croix drinking vinegar, tacos kombucha locavore fashion axe. Knausgaard chambray mumblecore, chia tumblr you probably haven't heard of them 3 wolf moon. Bitters blue bottle raw denim air plant, flexitarian fam heirloom 3 wolf moon literally. Plaid tbh green juice copper mug cray, chillwave fixie authentic hashtag YOLO 8-bit schlitz raw denim fingerstache shabby chic. Fashion axe live-edge mlkshk venmo. Neutra church-key dreamcatcher, ugh ennui freegan pabst roof party brooklyn. Green juice DIY schlitz vape."
    },
    {
        name: "Dante's Peak",
        image: "https://farm2.staticflickr.com/1084/1331589629_006a8916a2.jpg",
        description: "Tbh marfa la croix drinking vinegar, tacos kombucha locavore fashion axe. Knausgaard chambray mumblecore, chia tumblr you probably haven't heard of them 3 wolf moon. Bitters blue bottle raw denim air plant, flexitarian fam heirloom 3 wolf moon literally. Plaid tbh green juice copper mug cray, chillwave fixie authentic hashtag YOLO 8-bit schlitz raw denim fingerstache shabby chic. Fashion axe live-edge mlkshk venmo. Neutra church-key dreamcatcher, ugh ennui freegan pabst roof party brooklyn. Green juice DIY schlitz vape."
    },
    {
        name: "Backwoods Bonfire",
        image: "https://farm6.staticflickr.com/5554/14776809669_68a8e809e1.jpg",
        description: "Tbh marfa la croix drinking vinegar, tacos kombucha locavore fashion axe. Knausgaard chambray mumblecore, chia tumblr you probably haven't heard of them 3 wolf moon. Bitters blue bottle raw denim air plant, flexitarian fam heirloom 3 wolf moon literally. Plaid tbh green juice copper mug cray, chillwave fixie authentic hashtag YOLO 8-bit schlitz raw denim fingerstache shabby chic. Fashion axe live-edge mlkshk venmo. Neutra church-key dreamcatcher, ugh ennui freegan pabst roof party brooklyn. Green juice DIY schlitz vape."
    }
]

function seedDB(){
    //REMOVE CAMPGROUNDS
    Campground.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log('Removed Campgrounds');
            //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Added a campground');
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was wifi.",
                                author: "Kelyn"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err)
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log('Created New Comment');
                                }
                                
                            });
                    }
                });
            });
        }
    });
    
}

module.exports = seedDB;