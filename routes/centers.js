const express = require("express")
const {
  getCenters,
  getOneCenters,
  createCenter,
  updateCenter,
  deleteCenter
} = require("../controllers/centers")
const router = express.Router()

router
  .route("/")
  .get(getCenters)
  .post(createCenter)

router
  .route("/:id")
  .get(getOneCenters)
  .put(updateCenter)
  .delete(deleteCenter)

module.exports = router
