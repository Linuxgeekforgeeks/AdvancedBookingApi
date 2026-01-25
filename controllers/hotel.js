import Hotel from "../models/Hotel.js";
import { createError } from "../lib/error.js";

// CREATE hotel
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

// UPDATE hotel
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedHotel) {
      return next(createError(404, "Hotel not found"));
    }

    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

// DELETE hotel
export const deleteHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);

    if (!hotel) {
      return next(createError(404, "Hotel not found"));
    }

    res.status(200).json({
      message: "Hotel deleted successfully",
      status: true,
    });
  } catch (err) {
    next(err);
  }
};

// GET single hotel
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return next(createError(404, "Hotel not found"));
    }

    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

// GET all hotels
export const getAllHotels = async (req, res, next) => {
  try {
    // You can add query params support later, e.g. ?city=dar&min=50&max=300
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};