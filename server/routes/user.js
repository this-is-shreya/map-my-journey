const router = require("express").Router()
const { getUser, addEvent, getEvents, getMaps, modifyBadge, 
getSpecificEvent, updateEvent, deleteEvent} = require("../controllers/user")
const {checkAuth} = require("../middleware/auth")

router.get("/get-user",checkAuth,getUser)
router.post("/add-event",checkAuth,addEvent)
router.get("/get-events/:date",checkAuth,getEvents)
router.get("/get-specific-event/:date",checkAuth,getSpecificEvent)
router.get("/get-maps/:date",checkAuth,getMaps)
router.put("/modify-badge",checkAuth,modifyBadge)
router.put("/update-event/:id",checkAuth,updateEvent)
router.delete("/delete-event/:id",checkAuth,deleteEvent)

module.exports = router