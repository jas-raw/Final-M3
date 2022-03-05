const express = require('express'),
    router =  express.Router(),
    userCtrl = require('../controller/user.controller')

router.get('/:_id', userCtrl.findById)
router.get('/', userCtrl.list)
router.post('/', userCtrl.create)
router.put('/', userCtrl.update)
router.delete('/:_id', userCtrl.delete)

module.exports = router