const Review = require('../models/reviewModel');
//const catchAsync = require('../utils/catchAsync');
//const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

exports.getAllreviews = factory.getAll(Review);

exports.deleteReview = factory.deleteOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.getReview = factory.getOne(Review);

exports.setTourUserIds = (req, res, next) => {
  // Allow nexted routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createReview = factory.createOne(Review);