const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLogedin, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");







//Review - 
// REVIEW - POST ROUTE
router.post("/" , isLogedin,validateReview,  wrapAsync(reviewController.addNewReview));

// REVIEW - DELETE ROUTE
router.delete("/:reviewId", isLogedin,isReviewAuthor,wrapAsync(reviewController.destroyReview));


module.exports = router;