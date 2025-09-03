const Bike = require("../models/Product");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { checkPermissions } = require("../utils");
const path = require("path");

const createBike = async (req, res) => {
  req.body.user = req.user.userId;
  const bike = await Bike.create(req.body);
  res.status(StatusCodes.CREATED).json(bike);
};

const getAllBikes = async (req, res) => {
  const bikes = await Bike.find({}).populate("user").populate("reviews");
  if (!bikes) {
    throw new CustomError.NotFoundError("Cant find anything sorry");
  }
  res.status(StatusCodes.OK).json(bikes);
};

const getSingleBike = async (req, res) => {
  const { id } = req.params;
  const bike = await Bike.findById(id)
    .populate("user")
    .populate({
      path: "reviews",
      populate: {
        path: "user",
        select: "name",
      },
    });
  if (!bike) {
    throw new CustomError.NotFoundError("No bike found with thy id");
  }
  res.status(StatusCodes.OK).json(bike);
};

const updateBike = async (req, res) => {
  const { id } = req.params;
  const bike = await Bike.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  const user = await User.findById(bike.user._id);
  if (!bike) {
    throw new CustomError.NotFoundError(
      `No product found with thy id: ${req.params.id}`
    );
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ bike });
};

const deleteBike = async (req, res) => {
  const { id } = req.params;
  const bike = await Bike.findById({ _id: id });
  if (!bike) {
    throw new CustomError.NotFoundError(
      `No bike found with thy id: ${req.params.id}`
    );
  }
  // const user = await User.findById(bike.user._id);
  if (req.user.role !== "admin" && bike.user._id.toString() !== user.userId) {
    throw new CustomError.UnauthorizedError(
      "You are not allowed to delete this"
    );
  }
  checkPermissions(req.user, req.user._id);
  await bike.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Successfully deleted" });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }

  const productImage = req.files.image;

  const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedExtensions.includes(productImage.mimetype)) {
    throw new CustomError.BadRequestError(
      "Only .png, .jpg and .jpeg formats are allowed"
    );
  }

  // const maxSize = 1024 * 1024;
  // if (productImage.size > maxSize) {
  //   throw new CustomError.BadRequestError("File too big");
  // }

  const fileExt = path.extname(productImage.name);
  const baseName = path.basename(productImage.name, fileExt);
  const safeName = `${baseName.replace(/\s+/g, "_")}-${Date.now()}${fileExt}`;

  const imagePath = path.join(__dirname, "../public/uploads/", safeName);

  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/uploads/${safeName}` });
};

module.exports = {
  getAllBikes,
  getSingleBike,
  createBike,
  updateBike,
  deleteBike,
  uploadImage,
};
