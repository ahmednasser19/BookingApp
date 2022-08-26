import Users from "../models/Users.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js';
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new Users({
            username: req.body.username,
            password: hash,
            email: req.body.email,
        })


        await newUser.save()
        res.status(200).send("User has been created.")


    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        //check if the user exits
        const user = await Users.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User Not Found"));

        //check if the password is correct 
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createError(404, "Wrong password or username"));


        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).send({ ...otherDetails })


    } catch (err) {
        next(err)
    }
}