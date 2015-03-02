var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var Review = global.db.Review;
var controller = {};
var Sequelize = require('sequelize');
var ReviewInstance = require('../utils/reviewConstructor.js');

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

/* Creates a 
 */
controller.updateOne = function(req, res, next) {
  console.log('THE REQ IS AS SUCH', req.body);
  var rating = req.body.rating;
  var review = req.body.review;
  var id = req.params.reviewId;
  console.log(rating, review, id);
  Review.update(
  {
    rating: rating,
    review: review  
  }, 
  {
    where: {
      id: id   
    }
  })
  .catch(function(err){
    console.log('[error] [review controller] updating review');
    res.status(500);
  })
  .then(function(review){
    console.log(review);
    res.json(review);
  })
},

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
    console.log('error getting reviews for user: ' + userId, error);
    res.status(500).json({error: 'error getting reviews for user: ' + userId});
  }).then(function(reviews){
    res.json(reviews);
  });
};

// [Note] Fetches all reviews that a user has to complete, these reviews will be visible in the reviews tab
// [Note] Working!
controller.getPendingReviews = function(req, res, next) {
  console.log('fetching pending reviews');
  Review.findAll({
    where: Sequelize.and({reviewer_id: req.params.user},{rating: null},{review: null}),
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
};

module.exports = controller;
