import express from 'express'
import Hotel from '../models/Hotels.js'


const router = express.Router()
//CREATE
router.post("/", async (req, res) => {
    //take the hotel request info from the user
    const newHotel = new Hotel(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id", async (req, res) => {
    //take the hotel request info from the user
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedHotel)
    } catch (error) {
        res.status(500).json(err)
    }
})
//DELETE
router.delete("/:id", async (req, res) => {
    //take the hotel request info from the user
    try {
        await Hotel.findByIdAndDelete(req.params.id,)
        res.status(200).json("Hotel has been deleted")
    } catch (error) {
        res.status(500).json(err)
    }
})
//GET
router.get("/:id", async (req, res) => {

    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (error) {
        res.status(500).json(err)
    }
})
//GET ALL
router.get("/", async (req, res) => {

    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {
        res.status(500).json(err)
    }
})

export default router