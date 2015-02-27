var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var Review = global.db.Review;
var controller = {};
var Sequelize = require('sequelize');
var ReviewInstance = require('../utils/reviewConstructor.js');

controller.create = function(req, res, next){
  console.log('reviews ctrl create req.body:', req.body);
  console.log('reviews ctrl create req.params', req.params);
  // assume reviewer_id are in req.params (url)
  // assume reviewee_id, rating and review are in req.body (form)

  var newReview = {
    rating: req.body.rating,
    review: req.body.review,
    reviewee_id: req.body.reviewee_id,
    reviewer_id: req.params.user,
    item_id: req.body.item_id
  };
  console.log('\n',newReview+'\n');

  Review.create(newReview)
    .catch(function(err) {
      console.log('\nCreate Review Error:', err);
    })
    .then(function(review) {
      User.find({ 
        where: {id: review.reviewee_id}
      }).then(function(user) {
        user.update({
          reputation: user['reputation'] + parseInt(review.rating)
        });
      }).catch(function(err) {
        console.log('\nUser reputation update error:', err);
      }).then(function() {
        res.send(review);
      })
    });
};

controller.createPending = function(req, res, next){
  var lender_id   = req.params.lender_id;
  var borrower_id = req.params.borrower_id;
  var item_id     = req.body.item_id;
  var lenderReview = new ReviewInstance(null, null, borrower_id, lender_id, item_id);
  var borrowerReview = new ReviewInstance(null, null, lender_id, borrower_id, item_id);

  var records = [lenderReview, borrowerReview];
  Review.bulkCreate(records)
    .catch(function(err){
      console.log('error creating pending reviews', err);
      res.status(500);
    })
    .then(function(reviews){
      res.send(reviews);
    });
};

controller.getReviews = function(req, res, next){
  //Again, we have to query the borrower for its id because we only have its username
  //the lender id is included with the item
  console.log('reviews ctrl getReviews req.params', req.params);
  // Current user's reviews

  Review.findAll({
    // join with users, look for req.params.user which is a username
    // return the usernames of reviewers too
    where: {reviewee_id: req.params.user}
    // include: [ {model: User, as: 'reviewer_id'} ]
    // include: [User]
  }).catch(function(err) {
    console.log('\ngetReviews error:', err, '\n');
  }).then(function(reviews) {
    for (var i = 0; i<reviews.length; i++) {
      console.log('\nRESULT', i, ':\n', JSON.stringify(reviews[i]));
    }
    res.send(reviews);
  });
}

controller.getPendingReviews = function(req, res, next) {
  /*
  req.params = {
    user: 1 (userID in user table)
  }
  */
  // find reviews where reviewer is user and rating/review is null
  Review.findAll({
    where: {
      reviewer_id: req.params.user,
      rating: null,
      review: null
    },
    include: [
      { model: User, as: 'reviewee' },
      { model: Item, as: 'item' }
    ]
  }).catch(function(err) {
    console.error('\nReview find all error:', err);
  }).then(function(reviews) {
    console.log('\nREVIEWS:', reviews);
    res.send(reviews);
  })
}

module.exports = controller;
