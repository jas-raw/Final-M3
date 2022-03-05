const express = require('express'),
    router =  express.Router(),
    playerCtrl = require('../controller/player.controller')

router.get('/:_id', playerCtrl.findById)
router.get('/', playerCtrl.list)
router.post('/', playerCtrl.create)
router.put('/', playerCtrl.update)
router.delete('/:_id', playerCtrl.delete)

module.exports = router