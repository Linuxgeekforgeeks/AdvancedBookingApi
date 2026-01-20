import express from "express";
import Hotel from "../models/Hotel.js";
import { createError } from "../lib/error.js";

const router = express.Router();
//CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();

    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    },{new:true});
    res.status(200).json(updatedHotel);
  } catch (error) {
    throw error;
  }
});
//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "Hotel deleted Successfully.", status: true });
  } catch (error) {
    throw error;
  }
});
//GET

router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById({ _id: req.params.id });
    res.status(200).json(hotel);
  } catch (error) {
    throw error;
  }
});
//GET ALL
router.get("/", async (req, res,next) => {

  const failed=true;

  const err=new Error()

  err.status=404;
  err.message="Sorry not found"


  if(failed){ return next()}

  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (err) {
    next(err);
  }
});

export default router;
