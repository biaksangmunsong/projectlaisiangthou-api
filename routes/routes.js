const router = require("express").Router()
const test = require("./controllers/test")
const verses = require("./controllers/verses")

router.get("/test", test)
router.get("/verses", verses)

module.exports = router