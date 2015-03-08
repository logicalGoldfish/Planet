var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var Review = global.db.Review;
var controller = {};
var Sequelize = require('sequelize');
var ReviewInstance = require('../utils/reviewConstructor.js');

var calculateAvg = function(userId, cb) {
  var sum;
  Review.sum('rating', {
    where: { reviewee_id: userId },
  }).then(function(sum) {
    sum = sum;
    Review.count({
      where: { 
        reviewee_id: userId,
        rating: { ne: null }
      }
    }).then(function(count) {
      var roundedAvg = Math.round((sum/count)*2)/2;
      cb(roundedAvg);
    }).catch(function(err) {
      console.log('\nreview count error:', err);
    });
  }).catch(function(err) {
    console.error('\nreview sum error:', err);
  });
};

/* Creates a new review with rating and review.
 * THIS IS NOT BEING USED CURRENTLY.
 */
controller.create = function(req, res, next){
  console.log('reviews ctrl create req.body:', req.body);
  console.log('reviews ctrl create req.params', req.params);
  var newReview = {
    rating: req.body.rating,
    review: req.body.review,
    reviewee_id: req.body.reviewee_id,
    reviewer_id: req.params.userId,
    item_id: req.body.item_id
  };

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

/* Creates pending reviews.
 * Two blank review entries in the database are created
 * when the borrower returns the item.
 */
controller.createPending = function(req, res, next){
  var lender_id   = req.params.lender_id;
  var borrower_id = req.params.borrower_id;
  var item_id     = req.params.item_id;
  var lenderReview = new ReviewInstance(null, null, borrower_id, lender_id, item_id);
  var borrowerReview = new ReviewInstance(null, null, lender_id, borrower_id, item_id);

  var records = [lenderReview, borrowerReview];
  Review.bulkCreate(records)
  .catch(function(err){
    console.log('error creating pending reviews', err);
    res.status(500).json({error: 'error creating pending reviews'});
  }).then(function(reviews){
    res.send(reviews);
  });
};

/* Updates a review with the rating and review.
 */
controller.updateOne = function(req, res, next) {
  var rating = req.body.rating;
  var review = req.body.review;
  var id = req.params.reviewId;
  Review.update(
  {
    rating: rating,
    review: review  
  }, 
  {
    where: {
      id: id   
    }
  }).catch(function(err){
    console.log('\nReview.updateOne error:', err);
    res.status(500).json({error: '[review controller] updating review'});
  }).then(function(){
    Review.find({ where: {id: id} })
    .then(function(review) {
      var revieweeId = review.dataValues.reviewee_id;
      var revieweeAvg = calculateAvg(revieweeId, function(avg) {
        console.log('\nreviewee:',revieweeId);
        console.log('\nrevieweeAvg:', avg);
        User.update(
        { rating: avg },
        { where: {id: revieweeId} }
        ).catch(function(err) {
          console.log('\nReview.updateOne error:', err);
          res.status(500).json({error: 'review.updateOne error'});
        }).then(function(row){
          console.log('\nuser review updated');
          res.json(row);
        });
      });
    });
  });
};

/* Fetches all reviews for the logged in user.
 */

controller.getReviews = function(req, res, next){
  // console.log('fetching reviews for user ', req.params.user);
  // TODO: only return reviews that do not have null ratings
  var userId = req.params.userId;
  Review.findAll({
    where: {reviewee_id: userId},
    include: [{model: User, as: 'reviewer'}, {model: Item, as: 'item'}],
  }).catch(function(error){
    console.log('\nError getting reviews for user: ' + userId, error);
    res.status(500).json({error: 'error getting reviews for user: ' + userId});
  }).then(function(reviews){
    res.json(reviews);
  });
};

/* Fetches all reviews that a user has to complete.
 */
controller.getPendingReviews = function(req, res, next) {
  console.log('fetching pending reviews');
  var userId = req.params.userId;
  Review.findAll({
    where: Sequelize.and({reviewer_id: userId},{rating: null},{review: null}),
    include: [
      { model: User, as: 'reviewee' },
      { model: Item, as: 'item' }
    ]
  }).catch(function(err) {
    console.error('\nReview find all error:', err);
    res.status(500).json({error: 'error getting pending reviews for user: ' + userId});
  }).then(function(reviews) {
    console.log('\nREVIEWS:', reviews);
    res.send(reviews);
  });
};

module.exports = controller;
