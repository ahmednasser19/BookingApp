import express from 'express'
import { updateUser, deleteUser, getUser, getUsers } from '../controllers/user.js';
import { verifyToken, verifyUser } from '../utils/verifyToken.js';


const router = express.Router()

router.get("/checkAuthentication", verifyToken, (req, res, next) => {
    res.send("Hello user")
})

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("Hello user you are loged in ")
})
//UPDATE
router.put("/:id", updateUser)
//DELETE
router.delete("/:id", deleteUser)
//GET
router.get("/:id", getUser)
//GET ALL
router.get("/", getUsers)

export default router