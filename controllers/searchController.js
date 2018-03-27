

exports.search = (req, res, next) => {
  res.json(req.query)
}

exports.history  = (req, res, next) => {
  res.send('search history')
}