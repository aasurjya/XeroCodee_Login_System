const express = require("express");
const { signup, signin } = require("../controllers/userController");
const router = express.Router();


router.post('/signup', (req, res)=>{
    res.send("sign hol")
});
router.post('/signin', signin);

module.exports = router;