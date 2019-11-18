// @desc  GET all Centers
// @router GET /api/v1/centers
// @access public
exports.getCenters = (req, res, next) => {
  res.send("hello")
}

// @desc  GET center
// @router GET /api/v1/centers/:id
// @access public
exports.getOneCenters = (req, res, next) => {
  res.send("get one center")
}

// @desc  POST center
// @router POST /api/v1/centers/:id
// @access private
exports.createCenter = (req, res, next) => {
  res.send("post")
}

// @desc  uodate center
// @router PUT /api/v1/centers/:id
// @access private
exports.updateCenter = (req, res, next) => {
  res.send("updtte")
}

// @desc  delete center
// @router DELETE /api/v1/centers/:id
// @access private
exports.deleteCenter = (req, res, next) => {
  res.send("delete")
}
