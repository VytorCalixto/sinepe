var express = require('express')
var passport = require('passport')
var router = express.Router()

router.get('/', function (req, res) {
    res.json({
        msg: 'API is running'
    })
})

module.exports = router
