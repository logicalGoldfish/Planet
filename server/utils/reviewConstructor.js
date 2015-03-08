var Review = function(rating, review, reviewee_id, reviewer_id, item_id){
	this.rating = rating,
	this.review = review,
	this.reviewee_id = reviewee_id,
	this.reviewer_id = reviewer_id,
	this.item_id = item_id
}

module.exports = Review;