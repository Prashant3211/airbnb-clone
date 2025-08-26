const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLogedin, isOwner} = require("../middleware.js");
const review = require("../models/review.js");
const {validateListing} = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingController.index))
.post( isLogedin, upload.single('listing[image]'),  validateListing,   wrapAsync(listingController.createListing));





//new route
router.get("/new", isLogedin, listingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLogedin,  isOwner, upload.single('listing[image]'), validateListing,  wrapAsync(listingController.updateListing))
.delete( isLogedin,  isOwner, wrapAsync(listingController.destroyListing));




//edit route
router.get("/:id/edit", isLogedin, isOwner, wrapAsync(listingController.renderEditForm));




module.exports = router;